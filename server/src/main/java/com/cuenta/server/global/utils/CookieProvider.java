package com.cuenta.server.global.utils;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;
import com.cuenta.server.global.constants.Constants;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class CookieProvider {
  private final Constants constants;

  public void setCookies(HttpServletResponse response, String accessToken, String refreshToken) {
    ResponseCookie accessTokenCookie = ResponseCookie.from("_c_sys_id", accessToken)
        .httpOnly(true)
        .secure(true)
        .path("/")
        .maxAge(constants.getJwtExpiresIn())
        .sameSite(constants.getEnv().equals("prod") ? "None" : "Lax")
        .build();

    ResponseCookie refreshTokenCookie = ResponseCookie.from("_c_sys_rd", refreshToken)
        .httpOnly(true)
        .secure(true)
        .path("/")
        .maxAge(constants.getJwtRefreshExpiresIn())
        .sameSite(constants.getEnv().equals("prod") ? "None" : "Lax")
        .build();

    response.addHeader(HttpHeaders.SET_COOKIE, accessTokenCookie.toString());
    response.addHeader(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString());
  }
}
