package com.cuenta.server.modules.account.request;

import com.cuenta.server.modules.account.entity.Account;
import com.cuenta.server.modules.bank.entity.Bank;
import com.cuenta.server.modules.user.entity.User;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class AccountRequest {

  @NotBlank(message = "name은 필수 입력 값입니다.")
  private String name;

  @NotBlank(message = "accountType은 필수 입력 값입니다.")
  private String accountType;

  @NotNull(message = "초기 잔액은 필수입니다.")
  @Min(value = 0, message = "초기 잔액은 0 이상이어야 합니다.")
  private Long initialBalance;

  private Long bankId;

  @Pattern(regexp = "^\\d{4}$", message = "계좌번호는 끝 4자리 숫자만 입력해주세요.")
  private String accountNumber;

  public static Account toEntity(AccountRequest accountRequest, Bank bank, User user) {
    return Account.builder()
        .name(accountRequest.getName())
        .accountType(accountRequest.getAccountType())
        .initialBalance(accountRequest.getInitialBalance())
        .balance(accountRequest.getInitialBalance())
        .status(Account.STATUS_ACTIVE)
        .bank(bank)
        .user(user)
        .accountNumber(accountRequest.getAccountNumber())
        .build();
  }
}
