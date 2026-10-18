package com.cuenta.server.modules.cardissuer.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cuenta.server.modules.cardissuer.repository.CardIssuerRepository;
import com.cuenta.server.modules.cardissuer.response.CardIssuerResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CardIssuerService {

  private final CardIssuerRepository cardIssuerRepository;

  /**
   * 모든 활성 카드 발급사 조회
   *
   * @return 활성 카드 발급사 목록
   */
  @Transactional(readOnly = true)
  public List<CardIssuerResponse> getCardIssuers() {
    return cardIssuerRepository.findAllByIsActiveTrue().stream()
        .map(CardIssuerResponse::fromEntity)
        .toList();
  }
}
