package com.cuenta.server.global.error;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode implements ErrorCodeInterface {
  OK(HttpStatus.OK.value(), "성공"),
  BAD_REQUEST(HttpStatus.BAD_REQUEST.value(), "잘못된 요청입니다."),
  SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR.value(), "서버 에러가 발생했습니다."),
  UNAUTHORIZED(HttpStatus.UNAUTHORIZED.value(), "인증이 필요합니다."),
  FORBIDDEN(HttpStatus.FORBIDDEN.value(), "접근이 거부되었습니다."),
  INVALID_INPUT(HttpStatus.BAD_REQUEST.value(), "입력값이 유효하지 않습니다."),
  NOT_FOUND(HttpStatus.NOT_FOUND.value(), "요청하신 리소스를 찾을 수 없습니다."),

  // 인증 관련
  INVALID_ACCESS_TOKEN(HttpStatus.UNAUTHORIZED.value(), "유효하지 않은 액세스 토큰입니다."),
  EXPIRED_ACCESS_TOKEN(HttpStatus.UNAUTHORIZED.value(), "만료된 액세스 토큰입니다."),
  INVALID_EMAIL_OR_PASSWORD(HttpStatus.UNAUTHORIZED.value(), "이메일 또는 비밀번호가 올바르지 않습니다."),
  VERIFICATION_FAILED(HttpStatus.UNAUTHORIZED.value(), "인증에 실패했습니다."),
  VERIFICATION_TOKEN_INVALID(HttpStatus.UNAUTHORIZED.value(), "인증 토큰이 유효하지 않습니다."),
  TOO_MANY_LOGIN_ATTEMPTS(HttpStatus.TOO_MANY_REQUESTS.value(), "로그인 시도가 너무 많습니다. 잠시 후 다시 시도해주세요."),

  // 유저 관련
  USER_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "유저를 찾을 수 없습니다."),
  USER_ALREADY_EXISTS(HttpStatus.CONFLICT.value(), "이미 존재하는 유저입니다."),
  ;

  private final Integer httpStatusCode;
  private final String message;
}
