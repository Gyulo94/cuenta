package com.cuenta.server.modules.card.response;

import java.time.LocalDateTime;

import com.cuenta.server.modules.card.entity.Card;
import com.cuenta.server.modules.cardissuer.response.CardIssuerResponse;

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
public class CardResponse {
  private long id;
  private long userId;
  private CardIssuerResponse issuer;
  private long accountId;
  private String name;
  private String cardType;
  private String lastFourDigits;
  private Long creditLimit;
  private Integer billingDay;
  private Integer paymentDueDay;
  private String status;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

  public static CardResponse fromEntity(Card card) {
    return CardResponse.builder()
        .id(card.getId())
        .userId(card.getUser().getId())
        .issuer(CardIssuerResponse.fromEntity(card.getIssuer()))
        .accountId(card.getAccount().getId())
        .name(card.getName())
        .cardType(card.getCardType())
        .lastFourDigits(card.getLastFourDigits())
        .creditLimit(card.getCreditLimit())
        .billingDay(card.getBillingDay())
        .paymentDueDay(card.getPaymentDueDay())
        .status(card.getStatus())
        .createdAt(card.getCreatedAt())
        .updatedAt(card.getUpdatedAt())
        .build();
  }
}
