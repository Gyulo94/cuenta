package com.cuenta.server.modules.email.request;

public sealed interface Payload permits EmailPayload, UserPayload {
  String email();
}