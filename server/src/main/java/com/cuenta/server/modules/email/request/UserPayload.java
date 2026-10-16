package com.cuenta.server.modules.email.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public final class UserPayload implements Payload {
  String email;
  String name;
  @ToString.Exclude
  String password;

  @Override
  public String email() {
    return email;
  }
}
