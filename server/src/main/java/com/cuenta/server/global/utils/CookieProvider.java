package com.cuenta.server.global.utils;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;
import com.cuenta.server.global.constants.Constants;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class CookieProvider {

  private final Constants constants;

  public String getRefreshToken(HttpServletRequest request) {
    Cookie[] cookies = request.getCookies();
    if (cookies != null) {
      for (Cookie cookie : cookies) {
        if (constants.getCookieRefreshTokenName().equals(cookie.getName())) {
          return cookie.getValue();
        }
      }
    }
    return null;
  }

  public void setCookies(HttpServletResponse response, String accessToken, String refreshToken) {
    response.addHeader(HttpHeaders.SET_COOKIE,
        buildCookie(constants.getCookieAccessTokenName(), accessToken, constants.getJwtExpiresIn()).toString());
    response.addHeader(HttpHeaders.SET_COOKIE,
        buildCookie(constants.getCookieRefreshTokenName(), refreshToken, constants.getJwtRefreshExpiresIn()).toString());
  }

  public void clearCookies(HttpServletResponse response) {
    response.addHeader(HttpHeaders.SET_COOKIE, buildCookie(constants.getCookieAccessTokenName(), "", 0).toString());
    response.addHeader(HttpHeaders.SET_COOKIE, buildCookie(constants.getCookieRefreshTokenName(), "", 0).toString());
  }

  private ResponseCookie buildCookie(String name, String value, long maxAge) {
    return ResponseCookie.from(name, value)
        .httpOnly(true)
        .secure(true)
        .path("/")
        .maxAge(maxAge)
        .sameSite(constants.getEnv().equals("prod") ? "None" : "Lax")
        .build();
  }
}
