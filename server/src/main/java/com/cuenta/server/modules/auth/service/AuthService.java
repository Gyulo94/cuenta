package com.cuenta.server.modules.auth.service;

import java.util.Map;
import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cuenta.server.global.error.ErrorCode;
import com.cuenta.server.global.exception.ApiException;
import com.cuenta.server.modules.auth.request.AuthRequest;
import com.cuenta.server.modules.auth.request.ResetPasswordRequest;
import com.cuenta.server.modules.auth.response.TokenResponse;
import com.cuenta.server.modules.email.request.UserPayload;
import com.cuenta.server.global.jwt.JwtPayload;
import com.cuenta.server.global.jwt.JwtProvider;
import com.cuenta.server.modules.email.service.EmailService;
import com.cuenta.server.modules.user.entity.User;
import com.cuenta.server.modules.user.request.CreateUserRequest;
import com.cuenta.server.modules.user.service.UserService;
import com.cuenta.server.redis.RedisKey;
import com.cuenta.server.redis.service.RedisService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {
  private static final long MAX_LOGIN_FAILURES = 5;
  private static final long LOGIN_FAILURE_WINDOW_SECONDS = 15 * 60L;

  private final UserService userService;
  private final EmailService emailService;
  private final RedisService redis;
  private final ObjectMapper objectMapper;
  private final PasswordEncoder passwordEncoder;
  private final RedisKey redisKey;
  private final JwtProvider jwtProvider;

  /**
   * 회원가입 (인증 메일 발송)
   *
   * @param request 회원가입 요청
   * @throws ApiException 이미 가입된 이메일
   */
  public void register(CreateUserRequest request) {
    if (userService.existsActiveByEmail(request.getEmail())) {
      throw new ApiException(ErrorCode.USER_ALREADY_EXISTS);
    }

    UserPayload userRequest = new UserPayload();
    userRequest.setEmail(request.getEmail());
    userRequest.setName(request.getName());
    userRequest.setPassword(passwordEncoder.encode(request.getPassword()));

    emailService.sendVerificationEmail("register", userRequest);
  }

  /**
   * 회원가입 이메일 인증
   *
   * @param request 인증 토큰과 type
   * @throws ApiException 토큰이 유효하지 않거나 type이 register가 아님
   */
  public void verify(Map<String, String> request) {
    UUID token = parseToken(request.get("token"));
    String type = request.get("type");

    if ("register".equals(type)) {
      verifyRegister(token);
    } else {
      throw new ApiException(ErrorCode.VERIFICATION_FAILED);
    }
  }

  /**
   * 비밀번호 재설정 토큰 확인
   *
   * @param token 재설정 토큰
   * @return 토큰 주인의 이메일
   * @throws ApiException 토큰이 유효하지 않음
   */
  public String verifyResetToken(String token) {
    return userService.getResetTokenEmail(parseToken(token));
  }

  /**
   * 토큰 문자열을 UUID로 변환
   *
   * @param token 토큰 문자열
   * @return 토큰 UUID
   * @throws ApiException 토큰이 없거나 UUID 형식이 아님
   */
  private UUID parseToken(String token) {
    if (token == null) {
      throw new ApiException(ErrorCode.VERIFICATION_TOKEN_INVALID);
    }
    try {
      return UUID.fromString(token);
    } catch (IllegalArgumentException e) {
      throw new ApiException(ErrorCode.VERIFICATION_TOKEN_INVALID);
    }
  }

  /**
   * Redis에 저장된 가입 정보로 사용자 생성
   *
   * @param token 회원가입 인증 토큰
   * @throws ApiException 토큰이 유효하지 않거나 이미 가입된 이메일
   */
  private void verifyRegister(UUID token) {
    String REDIS_KEY = redisKey.verificationRegister(token);
    String cachedUserData = redis.get(REDIS_KEY);
    if (cachedUserData == null) {
      throw new ApiException(ErrorCode.VERIFICATION_TOKEN_INVALID);
    }

    CreateUserRequest userData;
    try {
      userData = objectMapper.readValue(cachedUserData, CreateUserRequest.class);
    } catch (JsonProcessingException e) {
      throw new ApiException(ErrorCode.VERIFICATION_FAILED);
    }
    if (userService.existsActiveByEmail(userData.getEmail())) {
      redis.del(REDIS_KEY);
      throw new ApiException(ErrorCode.USER_ALREADY_EXISTS);
    }

    userService.create(userData);

    redis.del(REDIS_KEY);
  }

  /**
   * 로그인
   *
   * @param request 로그인 요청
   * @return 액세스·리프레시 토큰
   * @throws ApiException 이메일·비밀번호가 틀리거나 시도 횟수 초과
   */
  public TokenResponse login(AuthRequest request) {
    User user = validateUser(request);

    String REDIS_KEY = redisKey.userRefreshToken(user.getId());

    JwtPayload payload = new JwtPayload(user.getId());

    TokenResponse tokens = generateTokens(payload);

    String existingToken = redis.get(REDIS_KEY);
    if (existingToken != null) {
      redis.del(REDIS_KEY);
    }
    redis.set(REDIS_KEY, tokens.getRefreshToken(), 7 * 24 * 60 * 60L);

    return tokens;
  }

  /**
   * 이메일·비밀번호 확인 (실패 횟수 제한 포함)
   *
   * @param request 로그인 요청
   * @return 로그인한 사용자
   * @throws ApiException 이메일·비밀번호가 틀리거나 시도 횟수 초과
   */
  private User validateUser(AuthRequest request) {
    String email = request.getEmail();
    String password = request.getPassword();

    String failKey = redisKey.loginFailCount(email);
    String failCount = redis.get(failKey);
    if (failCount != null && Long.parseLong(failCount) >= MAX_LOGIN_FAILURES) {
      throw new ApiException(ErrorCode.TOO_MANY_LOGIN_ATTEMPTS);
    }

    User user = userService.findActiveByEmail(email).orElse(null);
    if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
      redis.increment(failKey, LOGIN_FAILURE_WINDOW_SECONDS);
      throw new ApiException(ErrorCode.INVALID_EMAIL_OR_PASSWORD);
    }

    redis.del(failKey);
    return user;
  }

  /**
   * 액세스·리프레시 토큰 생성
   *
   * @param payload 토큰에 담을 사용자 정보
   * @return 액세스·리프레시 토큰
   */
  private TokenResponse generateTokens(JwtPayload payload) {
    String accessToken = jwtProvider.createAccessToken(payload);
    String refreshToken = jwtProvider.createRefreshToken(payload);
    TokenResponse response = TokenResponse.of(accessToken, refreshToken);
    return response;
  }

  /**
   * 비밀번호 재설정 메일 발송
   *
   * @param request 이메일
   */
  public void sendResetPasswordMail(Map<String, String> request) {
    String email = request.get("email");
    if (email == null) {
      return;
    }

    User user = userService.findActiveByEmail(email).orElse(null);
    if (user == null) {
      return;
    }

    UserPayload userPayload = new UserPayload();
    userPayload.setEmail(user.getEmail());

    emailService.sendVerificationEmail("reset", userPayload);
  }

  /**
   * 비밀번호 재설정
   *
   * @param request 재설정 토큰과 새 비밀번호
   * @throws ApiException 토큰이 유효하지 않음
   */
  public void resetPassword(ResetPasswordRequest request) {
    userService.resetPassword(request);
  }

  /**
   * 토큰 재발급
   *
   * @param refreshToken 리프레시 토큰
   * @return 새 액세스·리프레시 토큰
   * @throws ApiException 리프레시 토큰이 유효하지 않음
   */
  public TokenResponse refresh(String refreshToken) {
    if (refreshToken == null) {
      throw new ApiException(ErrorCode.INVALID_ACCESS_TOKEN);
    }

    Claims claims = jwtProvider.validateRefreshToken(refreshToken);
    if (claims == null) {
      throw new ApiException(ErrorCode.INVALID_ACCESS_TOKEN);
    }

    long userId = Long.parseLong(claims.getSubject());

    String REDIS_KEY = redisKey.userRefreshToken(userId);
    String storedToken = redis.get(REDIS_KEY);
    if (storedToken == null || !storedToken.equals(refreshToken)) {
      throw new ApiException(ErrorCode.INVALID_ACCESS_TOKEN);
    }

    JwtPayload payload = new JwtPayload(userId);
    TokenResponse tokens = generateTokens(payload);

    redis.del(REDIS_KEY);
    redis.set(REDIS_KEY, tokens.getRefreshToken(), 7 * 24 * 60 * 60L);

    return tokens;
  }

  /**
   * 로그아웃 (리프레시 토큰 삭제)
   *
   * @param refreshToken 리프레시 토큰
   */
  public void logout(String refreshToken) {
    if (refreshToken == null) {
      return;
    }

    Claims claims = jwtProvider.validateRefreshToken(refreshToken);
    if (claims == null) {
      return;
    }

    String REDIS_KEY = redisKey.userRefreshToken(Long.parseLong(claims.getSubject()));
    if (refreshToken.equals(redis.get(REDIS_KEY))) {
      redis.del(REDIS_KEY);
    }
  }

}
