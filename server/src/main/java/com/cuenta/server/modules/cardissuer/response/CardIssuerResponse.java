package com.cuenta.server.modules.cardissuer.response;

import com.cuenta.server.modules.cardissuer.entity.CardIssuer;

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
public class CardIssuerResponse {
  private long id;
  private String code;
  private String name;
  private String logo;
  private Long bankId;

  public static CardIssuerResponse fromEntity(CardIssuer cardIssuer) {
    return CardIssuerResponse.builder()
        .id(cardIssuer.getId())
        .code(cardIssuer.getCode())
        .name(cardIssuer.getName())
        .logo(cardIssuer.getLogo())
        .bankId(cardIssuer.getBank() == null ? null : cardIssuer.getBank().getId())
        .build();
  }
}
