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

  // 은행 관련
  BANK_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "해당 은행을 찾을 수 없습니다."),

  // 계좌 관련
  ACCOUNT_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "해당 계좌를 찾을 수 없습니다."),
  BANK_REQUIRED(HttpStatus.BAD_REQUEST.value(), "은행을 선택하세요."),
  CASH_WALLET_NOT_CREATABLE(HttpStatus.BAD_REQUEST.value(), "현금지갑은 직접 추가할 수 없습니다."),
  CASH_WALLET_NOT_UPDATABLE(HttpStatus.BAD_REQUEST.value(), "현금지갑은 수정할 수 없습니다."),
  CASH_WALLET_NOT_DELETABLE(HttpStatus.BAD_REQUEST.value(), "현금지갑은 삭제할 수 없습니다."),
  ACCOUNT_HAS_CARDS(HttpStatus.BAD_REQUEST.value(), "연결된 카드가 있는 계좌는 삭제할 수 없습니다."),

  // 카드 관련
  CARD_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "해당 카드를 찾을 수 없습니다."),
  CARD_ISSUER_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "해당 카드사를 찾을 수 없습니다."),
  CARD_ACCOUNT_NOT_PAYABLE(HttpStatus.BAD_REQUEST.value(), "현금지갑은 결제 계좌로 연결할 수 없습니다."),
  CARD_ACCOUNT_BANK_MISMATCH(HttpStatus.BAD_REQUEST.value(), "체크카드는 카드사와 같은 은행 계좌만 연결할 수 있습니다."),
  PAYMENT_DUE_DAY_REQUIRED(HttpStatus.BAD_REQUEST.value(), "신용카드는 결제일을 입력하세요."),
  ;

  private final Integer httpStatusCode;
  private final String message;
}
