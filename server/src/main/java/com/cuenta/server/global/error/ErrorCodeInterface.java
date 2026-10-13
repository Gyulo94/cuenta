package com.cuenta.server.global.error;

public interface ErrorCodeInterface {

  Integer getHttpStatusCode();

  String getMessage();
}
