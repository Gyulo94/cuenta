package com.cuenta.server.modules.auth.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cuenta.server.global.api.Api;
import com.cuenta.server.global.message.ResponseMessage;
import com.cuenta.server.modules.auth.request.AuthRequest;
import com.cuenta.server.modules.auth.request.ResetPasswordRequest;
import com.cuenta.server.modules.auth.response.TokenResponse;
import com.cuenta.server.modules.auth.service.AuthService;
import com.cuenta.server.modules.user.request.CreateUserRequest;
import com.cuenta.server.global.utils.CookieProvider;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Tag(name = "Auth", description = "인증 API")
@SecurityRequirements
@RestController
@RequestMapping("auth")
@RequiredArgsConstructor
public class AuthController {
  private final AuthService authService;
  private final CookieProvider cookieProvider;

  @Operation(summary = "회원가입 (인증 메일 발송)")
  @PostMapping("register")
  public Api<Void> register(@Valid @RequestBody CreateUserRequest request) {
    authService.register(request);
    return Api.OK(ResponseMessage.VERIFICATION_EMAIL_SENT);
  }

  @Operation(summary = "회원가입 이메일 인증")
  @PostMapping("verify")
  public Api<Void> verify(@RequestBody Map<String, String> request) {
    authService.verify(request);
    return Api.OK(ResponseMessage.VERIFICATION_SUCCESS);
  }

  @Operation(summary = "로그인")
  @PostMapping("login")
  public Api<Void> login(@Valid @RequestBody AuthRequest request, HttpServletResponse response) {
    TokenResponse tokens = authService.login(request);
    cookieProvider.setCookies(response, tokens.getAccessToken(), tokens.getRefreshToken());
    return Api.OK();
  }

  @Operation(summary = "비밀번호 재설정 메일 발송")
  @PostMapping("reset-password/send")
  public Api<Void> sendResetPasswordMail(@RequestBody Map<String, String> request) {
    authService.sendResetPasswordMail(request);
    return Api.OK(ResponseMessage.VERIFICATION_EMAIL_SENT);
  }

  @Operation(summary = "비밀번호 재설정 토큰 확인")
  @GetMapping("reset-password/verify")
  public Api<Map<String, String>> resetPasswordVerify(@RequestParam("token") String token) {
    String email = authService.verifyResetToken(token);
    return Api.OK(Map.of("email", email), ResponseMessage.VERIFICATION_SUCCESS);
  }

  @Operation(summary = "비밀번호 재설정")
  @PostMapping("reset-password")
  public Api<Void> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
    authService.resetPassword(request);
    return Api.OK(ResponseMessage.PASSWORD_RESET_SUCCESS);
  }

  @Operation(summary = "토큰 재발급")
  @PostMapping("refresh")
  public Api<Void> refresh(HttpServletRequest request, HttpServletResponse response) {
    String refreshToken = cookieProvider.getRefreshToken(request);
    TokenResponse tokens = authService.refresh(refreshToken);
    cookieProvider.setCookies(response, tokens.getAccessToken(), tokens.getRefreshToken());
    return Api.OK();
  }

  @Operation(summary = "로그아웃")
  @PostMapping("logout")
  public Api<Void> logout(HttpServletRequest request, HttpServletResponse response) {
    authService.logout(cookieProvider.getRefreshToken(request));
    cookieProvider.clearCookies(response);
    return Api.OK();
  }
}