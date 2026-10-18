package com.cuenta.server.modules.bank.response;

import com.cuenta.server.modules.bank.entity.Bank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BankResponse {
  private long id;
  private String code;
  private String name;
  private String logo;

  public static BankResponse fromEntity(Bank bank) {
    return BankResponse.builder()
        .id(bank.getId())
        .code(bank.getCode())
        .name(bank.getName())
        .logo(bank.getLogo())
        .build();
  }
}
