package com.cuenta.server.modules.card.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cuenta.server.global.annotations.CurrentUser;
import com.cuenta.server.global.api.Api;
import com.cuenta.server.global.jwt.JwtPayload;
import com.cuenta.server.modules.card.request.CardRequest;
import com.cuenta.server.modules.card.response.CardResponse;
import com.cuenta.server.modules.card.service.CardService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Tag(name = "Cards", description = "카드 API")
@RestController
@RequestMapping("cards")
@RequiredArgsConstructor
public class CardController {
  private final CardService cardService;

  @PostMapping
  @Operation(summary = "카드 생성", description = "새로운 카드를 등록합니다.")
  public Api<CardResponse> createCard(@Valid @RequestBody CardRequest request,
      @CurrentUser JwtPayload user) {
    CardResponse response = cardService.createCard(request, user.getId());
    return Api.OK(response);
  }

  @GetMapping
  @Operation(summary = "카드 목록 조회", description = "사용자의 모든 카드 목록을 조회합니다.")
  public Api<List<CardResponse>> getCards(@CurrentUser JwtPayload user) {
    List<CardResponse> response = cardService.getCards(user.getId());
    return Api.OK(response);
  }

  @GetMapping("/{id}")
  @Operation(summary = "카드 조회", description = "사용자의 특정 카드를 조회합니다.")
  public Api<CardResponse> getCardById(@PathVariable("id") Long id,
      @CurrentUser JwtPayload user) {
    CardResponse response = cardService.getCardById(id, user.getId());
    return Api.OK(response);
  }

  @PutMapping("/{id}")
  @Operation(summary = "카드 수정", description = "사용자의 특정 카드 정보를 수정합니다.")
  public Api<CardResponse> updateCard(@PathVariable("id") Long id,
      @Valid @RequestBody CardRequest request,
      @CurrentUser JwtPayload user) {
    CardResponse response = cardService.updateCard(id, request, user.getId());
    return Api.OK(response);
  }

  @DeleteMapping("/{id}")
  @Operation(summary = "카드 삭제", description = "사용자의 특정 카드를 삭제합니다.")
  public Api<Void> deleteCard(@PathVariable("id") Long id,
      @CurrentUser JwtPayload user) {
    cardService.deleteCard(id, user.getId());
    return Api.OK();
  }
}
