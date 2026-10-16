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
  private final UserService userService;
  private final EmailService emailService;
  private final RedisService redis;
  private final ObjectMapper objectMapper;
  private final PasswordEncoder passwordEncoder;
  private final RedisKey redisKey;
  private final JwtProvider jwtProvider;

  public void register(CreateUserRequest request) {
    if (userService.existsActiveByEmail(request.getEmail())) {
      throw new ApiException(ErrorCode.USER_ALREADY_EXISTS);
    }

    UserPayload userRequest = new UserPayload();
    userRequest.setEmail(request.getEmail());
    userRequest.setName(request.getName());
    userRequest.setPassword(request.getPassword());

    emailService.sendVerificationEmail("register", userRequest);
  }

  public void verify(Map<String, String> request) {
    UUID token = UUID.fromString(request.get("token"));
    String type = request.get("type");
    if (token == null) {
      throw new ApiException(ErrorCode.VERIFICATION_TOKEN_INVALID);
    }

    if ("register".equals(type)) {
      verifyRegister(token);
      return;
    } else if ("reset".equals(type)) {
      return;
    } else {
      throw new ApiException(ErrorCode.VERIFICATION_FAILED);
    }
  }

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

  private User validateUser(AuthRequest request) {
    String email = request.getEmail();
    String password = request.getPassword();

    User user = userService.findActiveByEmail(email)
        .orElseThrow(() -> new ApiException(ErrorCode.INVALID_EMAIL_OR_PASSWORD));

    if (passwordEncoder.matches(password, user.getPassword())) {
      return user;
    } else {
      throw new ApiException(ErrorCode.INVALID_EMAIL_OR_PASSWORD);
    }
  }

  private TokenResponse generateTokens(JwtPayload payload) {
    String accessToken = jwtProvider.createAccessToken(payload);
    String refreshToken = jwtProvider.createRefreshToken(payload);
    TokenResponse response = TokenResponse.of(accessToken, refreshToken);
    return response;
  }

  public void sendResetPasswordMail(Map<String, String> request) {
    String email = request.get("email");
    String type = request.get("type");

    User user = userService.findActiveByEmail(email)
        .orElseThrow(() -> new ApiException(ErrorCode.USER_NOT_FOUND));

    UserPayload userPayload = new UserPayload();
    userPayload.setEmail(user.getEmail());

    emailService.sendVerificationEmail(type, userPayload);
  }

  public void resetPassword(ResetPasswordRequest request) {
    userService.resetPassword(request);
  }

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
