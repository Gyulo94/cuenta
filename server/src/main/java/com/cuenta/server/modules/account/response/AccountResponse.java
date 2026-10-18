package com.cuenta.server.modules.account.response;

import java.time.LocalDateTime;

import com.cuenta.server.modules.account.entity.Account;
import com.cuenta.server.modules.bank.response.BankResponse;

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
public class AccountResponse {
  private long id;
  private long userId;
  private BankResponse bank;
  private String name;
  private String accountNumber;
  private String accountType;
  private long initialBalance;
  private long balance;
  private String status;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

  public static AccountResponse fromEntity(Account account) {
    return AccountResponse.builder()
        .id(account.getId())
        .userId(account.getUser().getId())
        .bank(account.getBank() == null ? null : BankResponse.fromEntity(account.getBank()))
        .name(account.getName())
        .accountNumber(account.getAccountNumber())
        .accountType(account.getAccountType())
        .initialBalance(account.getInitialBalance())
        .balance(account.getBalance())
        .status(account.getStatus())
        .createdAt(account.getCreatedAt())
        .updatedAt(account.getUpdatedAt())
        .build();
  }
}
