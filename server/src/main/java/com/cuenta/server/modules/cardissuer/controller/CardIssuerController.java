package com.cuenta.server.modules.cardissuer.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cuenta.server.global.api.Api;
import com.cuenta.server.modules.cardissuer.response.CardIssuerResponse;
import com.cuenta.server.modules.cardissuer.service.CardIssuerService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@Tag(name = "Card Issuers", description = "카드 발급사 API")
@RestController
@RequestMapping("card-issuers")
@RequiredArgsConstructor
public class CardIssuerController {

  private final CardIssuerService cardIssuerService;

  @GetMapping
  @Operation(summary = "카드 발급사 목록 조회", description = "활성 카드 발급사 목록을 조회합니다.")
  public Api<List<CardIssuerResponse>> getCardIssuers() {
    List<CardIssuerResponse> response = cardIssuerService.getCardIssuers();
    return Api.OK(response);
  }
}
