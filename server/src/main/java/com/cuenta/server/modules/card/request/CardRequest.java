package com.cuenta.server.modules.card.request;

import com.cuenta.server.modules.account.entity.Account;
import com.cuenta.server.modules.card.entity.Card;
import com.cuenta.server.modules.cardissuer.entity.CardIssuer;
import com.cuenta.server.modules.user.entity.User;

import jakarta.validation.constraints.Max;
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
public class CardRequest {

  @NotBlank(message = "카드명은 필수 입력 값입니다.")
  private String name;

  @NotNull(message = "카드사는 필수 입력 값입니다.")
  private Long issuerId;

  @NotBlank(message = "카드 종류는 필수 입력 값입니다.")
  @Pattern(regexp = "CREDIT|DEBIT", message = "카드 종류는 CREDIT 또는 DEBIT이어야 합니다.")
  private String cardType;

  @NotNull(message = "결제 계좌는 필수 입력 값입니다.")
  private Long accountId;

  @Pattern(regexp = "^\\d{4}$", message = "카드번호는 끝 4자리 숫자만 입력해주세요.")
  private String lastFourDigits;

  @Min(value = 0, message = "한도는 0 이상이어야 합니다.")
  private Long creditLimit;

  @Min(value = 1, message = "청구 기준일은 1일부터 31일 사이여야 합니다.")
  @Max(value = 31, message = "청구 기준일은 1일부터 31일 사이여야 합니다.")
  private Integer billingDay;

  @Min(value = 1, message = "결제일은 1일부터 31일 사이여야 합니다.")
  @Max(value = 31, message = "결제일은 1일부터 31일 사이여야 합니다.")
  private Integer paymentDueDay;

  public static Card toEntity(CardRequest request, CardIssuer issuer, Account account, User user) {
    boolean credit = Card.TYPE_CREDIT.equals(request.getCardType());
    return Card.builder()
        .user(user)
        .issuer(issuer)
        .account(account)
        .name(request.getName())
        .cardType(request.getCardType())
        .lastFourDigits(request.getLastFourDigits())
        .creditLimit(credit ? request.getCreditLimit() : null)
        .billingDay(credit ? request.getBillingDay() : null)
        .paymentDueDay(credit ? request.getPaymentDueDay() : null)
        .status(Card.STATUS_ACTIVE)
        .build();
  }
}
