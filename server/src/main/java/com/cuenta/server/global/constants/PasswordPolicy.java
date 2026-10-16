package com.cuenta.server.global.constants;

public final class PasswordPolicy {
  public static final String REGEX = "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,20}$";
  public static final String MESSAGE = "비밀번호는 8~20자이며 대문자, 소문자, 숫자, 특수문자를 모두 포함해야 합니다.";

  private PasswordPolicy() {
  }
}
