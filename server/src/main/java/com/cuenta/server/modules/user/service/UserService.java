package com.cuenta.server.modules.user.service;

import java.util.Optional;
import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cuenta.server.global.error.ErrorCode;
import com.cuenta.server.global.exception.ApiException;
import com.cuenta.server.modules.auth.request.ResetPasswordRequest;
import com.cuenta.server.modules.user.entity.User;
import com.cuenta.server.modules.user.repository.UserQueryRepository;
import com.cuenta.server.modules.user.repository.UserRepository;
import com.cuenta.server.modules.user.request.CreateUserRequest;
import com.cuenta.server.modules.user.response.UserResponse;
import com.cuenta.server.redis.RedisKey;
import com.cuenta.server.redis.service.RedisService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;
  private final UserQueryRepository userQueryRepository;
  private final PasswordEncoder passwordEncoder;
  private final RedisKey redisKey;
  private final RedisService redis;
  private final ObjectMapper objectMapper;

  public Optional<User> findActiveByEmail(String email) {
    return userQueryRepository.findActiveByEmail(email);
  }

  public boolean existsActiveByEmail(String email) {
    return userQueryRepository.existsActiveByEmail(email);
  }

  public void create(CreateUserRequest userData) {
    userRepository.save(CreateUserRequest.toEntity(userData, userData.getPassword()));
  }

  public void resetPassword(ResetPasswordRequest request) {
    UUID token = request.getToken();
    if (token == null) {
      throw new ApiException(ErrorCode.VERIFICATION_TOKEN_INVALID);
    }

    String redisKeyName = redisKey.verificationReset(token);

    String email = getResetTokenEmail(token);

    User user = userQueryRepository.findActiveByEmail(email)
        .orElseThrow(() -> new ApiException(ErrorCode.USER_NOT_FOUND));

    String hashedPassword = passwordEncoder.encode(request.getNewPassword());
    user.setPassword(hashedPassword);
    userRepository.save(user);

    redis.del(redisKeyName);

    redis.del(redisKey.userRefreshToken(user.getId()));
  }

  public String getResetTokenEmail(UUID token) {
    String cachedPayload = redis.get(redisKey.verificationReset(token));
    if (cachedPayload == null) {
      throw new ApiException(ErrorCode.VERIFICATION_TOKEN_INVALID);
    }

    String email;
    try {
      email = objectMapper.readTree(cachedPayload).path("email").asText(null);
    } catch (JsonProcessingException e) {
      throw new ApiException(ErrorCode.VERIFICATION_FAILED);
    }
    if (email == null) {
      throw new ApiException(ErrorCode.VERIFICATION_TOKEN_INVALID);
    }
    return email;
  }

  public UserResponse getSession(long id) {
    User user = userRepository.findById(id)
        .orElseThrow(() -> new ApiException(ErrorCode.USER_NOT_FOUND));

    UserResponse response = UserResponse.fromEntity(user);
    return response;
  }

}
