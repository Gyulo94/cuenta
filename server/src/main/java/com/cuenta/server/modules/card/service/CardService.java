package com.cuenta.server.modules.card.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cuenta.server.global.error.ErrorCode;
import com.cuenta.server.global.exception.ApiException;
import com.cuenta.server.modules.account.entity.Account;
import com.cuenta.server.modules.account.repository.AccountRepository;
import com.cuenta.server.modules.card.entity.Card;
import com.cuenta.server.modules.card.repository.CardRepository;
import com.cuenta.server.modules.card.request.CardRequest;
import com.cuenta.server.modules.card.response.CardResponse;
import com.cuenta.server.modules.cardissuer.entity.CardIssuer;
import com.cuenta.server.modules.cardissuer.repository.CardIssuerRepository;
import com.cuenta.server.modules.user.entity.User;
import com.cuenta.server.modules.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CardService {
  private final CardRepository cardRepository;
  private final CardIssuerRepository cardIssuerRepository;
  private final AccountRepository accountRepository;
  private final UserRepository userRepository;

  /**
   * 새로운 카드 생성
   *
   * @param request 카드 생성 요청
   * @param userId  사용자 ID
   * @return 생성된 카드 응답
   */
  @Transactional
  public CardResponse createCard(CardRequest request, long userId) {
    validatePaymentDueDay(request);
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new ApiException(ErrorCode.USER_NOT_FOUND));
    CardIssuer issuer = findIssuer(request.getIssuerId());
    Account account = findPayableAccount(request, issuer, userId);

    Card card = cardRepository.save(CardRequest.toEntity(request, issuer, account, user));
    return CardResponse.fromEntity(card);
  }

  /**
   * 사용자의 모든 카드 조회
   *
   * @param userId 사용자 ID
   * @return 카드 응답 목록
   */
  @Transactional(readOnly = true)
  public List<CardResponse> getCards(long userId) {
    return cardRepository.findByUserIdAndStatusOrderByIdAsc(userId, Card.STATUS_ACTIVE).stream()
        .map(CardResponse::fromEntity)
        .toList();
  }

  /**
   * 특정 카드 조회
   *
   * @param id     카드 ID
   * @param userId 사용자 ID
   * @return 카드 응답
   */
  @Transactional(readOnly = true)
  public CardResponse getCardById(Long id, long userId) {
    return CardResponse.fromEntity(findOwnedCard(id, userId));
  }

  /**
   * 특정 카드 수정
   *
   * @param id      카드 ID
   * @param request 카드 수정 요청
   * @param userId  사용자 ID
   * @return 수정된 카드 응답
   */
  @Transactional
  public CardResponse updateCard(Long id, CardRequest request, long userId) {
    validatePaymentDueDay(request);
    Card card = findOwnedCard(id, userId);
    CardIssuer issuer = findIssuer(request.getIssuerId());
    Account account = findPayableAccount(request, issuer, userId);

    card.update(request, issuer, account);
    return CardResponse.fromEntity(card);
  }

  /**
   * 특정 카드 삭제
   *
   * @param id     카드 ID
   * @param userId 사용자 ID
   */
  @Transactional
  public void deleteCard(Long id, long userId) {
    findOwnedCard(id, userId).close();
  }

  /**
   * 특정 사용자가 소유한 카드 조회
   *
   * @param id     카드 ID
   * @param userId 사용자 ID
   * @return 카드 엔티티
   */
  private Card findOwnedCard(Long id, long userId) {
    Card card = cardRepository.findById(id)
        .filter(found -> Card.STATUS_ACTIVE.equals(found.getStatus()))
        .orElseThrow(() -> new ApiException(ErrorCode.CARD_NOT_FOUND));
    if (card.getUser().getId() != userId) {
      throw new ApiException(ErrorCode.FORBIDDEN);
    }
    return card;
  }

  /**
   * 카드사 조회
   *
   * @param issuerId 카드사 ID
   * @return 카드사 엔티티
   */
  private CardIssuer findIssuer(Long issuerId) {
    return cardIssuerRepository.findByIdAndIsActiveTrue(issuerId)
        .orElseThrow(() -> new ApiException(ErrorCode.CARD_ISSUER_NOT_FOUND));
  }

  /**
   * 결제 가능한 계좌 조회
   *
   * @param request 카드 요청
   * @param issuer  카드사 엔티티
   * @param userId  사용자 ID
   * @return 결제 가능한 계좌 엔티티
   */
  private Account findPayableAccount(CardRequest request, CardIssuer issuer, long userId) {
    Account account = accountRepository.findById(request.getAccountId())
        .filter(found -> Account.STATUS_ACTIVE.equals(found.getStatus()))
        .orElseThrow(() -> new ApiException(ErrorCode.ACCOUNT_NOT_FOUND));
    if (account.getUser().getId() != userId) {
      throw new ApiException(ErrorCode.FORBIDDEN);
    }
    if (account.isCash()) {
      throw new ApiException(ErrorCode.CARD_ACCOUNT_NOT_PAYABLE);
    }
    boolean debit = Card.TYPE_DEBIT.equals(request.getCardType());
    if (debit && issuer.getBank() != null && account.getBank().getId() != issuer.getBank().getId()) {
      throw new ApiException(ErrorCode.CARD_ACCOUNT_BANK_MISMATCH);
    }
    return account;
  }

  /**
   * 결제일 유효성 검증
   *
   * @param request 카드 요청
   */
  private void validatePaymentDueDay(CardRequest request) {
    if (Card.TYPE_CREDIT.equals(request.getCardType()) && request.getPaymentDueDay() == null) {
      throw new ApiException(ErrorCode.PAYMENT_DUE_DAY_REQUIRED);
    }
  }
}
