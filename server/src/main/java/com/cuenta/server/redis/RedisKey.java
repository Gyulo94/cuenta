package com.cuenta.server.redis;

import java.util.UUID;

import org.springframework.stereotype.Component;

import com.cuenta.server.global.constants.Constants;

@Component
public class RedisKey {
  private final String PREFIX;

  public RedisKey(Constants constants) {
    this.PREFIX = constants.getAppName();
  }

  public String verificationRegister(UUID token) {
    return PREFIX + ":verification:register:" + token.toString();
  }

  public String verificationReset(UUID token) {
    return PREFIX + ":verification:reset:" + token.toString();
  }

  public String userRefreshToken(long userId) {
    return PREFIX + ":RT:" + userId;
  }

  public String loginFailCount(String email) {
    return PREFIX + ":login-fail:" + email.toLowerCase();
  }

  public String cachedTokens(long userId) {
    return PREFIX + ":cached:" + userId;
  }
}
