package com.cuenta.server.modules.account.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cuenta.server.global.exception.ApiException;
import com.cuenta.server.global.error.ErrorCode;
import com.cuenta.server.modules.account.entity.Account;
import com.cuenta.server.modules.account.repository.AccountRepository;
import com.cuenta.server.modules.card.entity.Card;
import com.cuenta.server.modules.card.repository.CardRepository;
import com.cuenta.server.modules.user.entity.User;
import com.cuenta.server.modules.user.repository.UserRepository;

import com.cuenta.server.modules.bank.entity.Bank;
import com.cuenta.server.modules.bank.repository.BankRepository;
import com.cuenta.server.modules.account.request.AccountRequest;
import com.cuenta.server.modules.account.response.AccountResponse;
import java.util.List;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AccountService {
  private final AccountRepository accountRepository;
  private final UserRepository userRepository;
  private final BankRepository bankRepository;
  private final CardRepository cardRepository;

  /**
   * 회원가입한 사용자의 기본 현금지갑 생성
   *
   * @param user 가입한 사용자
   */
  @Transactional
  public void createCashWallet(User user) {
    accountRepository.save(Account.cashWallet(user));
  }

  /**
   * 새로운 계좌 생성
   *
   * @param request 계좌 생성 요청
   * @param userId  사용자 ID
   * @return 생성된 계좌 응답
   */
  @Transactional
  public AccountResponse createAccount(AccountRequest request, long userId) {
    if (!Account.TYPE_ACCOUNT.equals(request.getAccountType())) {
      throw new ApiException(ErrorCode.CASH_WALLET_NOT_CREATABLE);
    }
    Bank bank = findBank(request.getBankId());
    User user = userRepository.findById(userId).orElseThrow(() -> new ApiException(ErrorCode.USER_NOT_FOUND));

    Account newAccount = accountRepository.save(AccountRequest.toEntity(request, bank, user));
    AccountResponse response = AccountResponse.fromEntity(newAccount);
    return response;
  }

  /**
   * 사용자의 모든 계좌 조회
   *
   * @param userId 사용자 ID
   * @return 계좌 응답 목록
   */
  @Transactional(readOnly = true)
  public List<AccountResponse> getAccounts(long userId) {
    List<Account> accounts = accountRepository.findByUserIdAndStatus(userId, Account.STATUS_ACTIVE);
    List<AccountResponse> responses = accounts.stream().map(AccountResponse::fromEntity).toList();
    return responses;
  }

  /**
   * 특정 계좌 조회
   *
   * @param id     계좌 ID
   * @param userId 사용자 ID
   * @return 계좌 응답
   */
  @Transactional(readOnly = true)
  public AccountResponse getAccountById(Long id, long userId) {
    Account account = accountRepository.findById(id)
        .orElseThrow(() -> new ApiException(ErrorCode.ACCOUNT_NOT_FOUND));
    if (account.getUser().getId() != userId) {
      throw new ApiException(ErrorCode.FORBIDDEN);
    }
    AccountResponse response = AccountResponse.fromEntity(account);
    return response;
  }

  /**
   * 특정 계좌 수정
   *
   * @param id      계좌 ID
   * @param request 계좌 수정 요청
   * @param userId  사용자 ID
   * @return 수정된 계좌 응답
   */
  @Transactional
  public AccountResponse updateAccount(Long id, AccountRequest request, long userId) {
    Account account = accountRepository.findById(id)
        .orElseThrow(() -> new ApiException(ErrorCode.ACCOUNT_NOT_FOUND));
    if (account.getUser().getId() != userId) {
      throw new ApiException(ErrorCode.FORBIDDEN);
    }
    if (account.isCash()) {
      throw new ApiException(ErrorCode.CASH_WALLET_NOT_UPDATABLE);
    }

    Bank bank = findBank(request.getBankId());
    account.update(request, bank);
    AccountResponse response = AccountResponse.fromEntity(account);
    return response;
  }

  /**
   * 특정 계좌 삭제
   *
   * @param id     계좌 ID
   * @param userId 사용자 ID
   */
  @Transactional
  public void deleteAccount(Long id, long userId) {
    Account account = accountRepository.findById(id)
        .orElseThrow(() -> new ApiException(ErrorCode.ACCOUNT_NOT_FOUND));
    if (account.getUser().getId() != userId) {
      throw new ApiException(ErrorCode.FORBIDDEN);
    }
    if (account.isCash()) {
      throw new ApiException(ErrorCode.CASH_WALLET_NOT_DELETABLE);
    }
    if (cardRepository.existsByAccountIdAndStatus(account.getId(), Card.STATUS_ACTIVE)) {
      throw new ApiException(ErrorCode.ACCOUNT_HAS_CARDS);
    }
    account.setStatus(Account.STATUS_INACTIVE);
  }

  private Bank findBank(Long bankId) {
    if (bankId == null) {
      throw new ApiException(ErrorCode.BANK_REQUIRED);
    }
    return bankRepository.findByIdAndIsActiveTrue(bankId)
        .orElseThrow(() -> new ApiException(ErrorCode.BANK_NOT_FOUND));
  }
}
