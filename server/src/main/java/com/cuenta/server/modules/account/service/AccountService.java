package com.cuenta.server.modules.account.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cuenta.server.global.exception.ApiException;
import com.cuenta.server.global.error.ErrorCode;
import com.cuenta.server.modules.account.entity.Account;
import com.cuenta.server.modules.account.repository.AccountRepository;
import com.cuenta.server.modules.user.entity.User;
import com.cuenta.server.modules.user.repository.UserRepository;
import com.cuenta.server.modules.bank.entity.Bank;
import com.cuenta.server.modules.bank.repository.BankRepository;
import com.cuenta.server.modules.account.request.CreateAccountRequest;
import com.cuenta.server.modules.account.response.AccountResponse;
import java.util.List;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AccountService {
  private final AccountRepository accountRepository;
  private final UserRepository userRepository;
  private final BankRepository bankRepository;

  @Transactional
  public AccountResponse createAccount(CreateAccountRequest request, long userId) {
    User user = userRepository.findById(userId).orElseThrow(() -> new ApiException(ErrorCode.USER_NOT_FOUND));
    Bank bank = null;
    if (request.getBankId() != null) {
      bank = bankRepository.findByIdAndIsActiveTrue(request.getBankId())
          .orElseThrow(() -> new ApiException(ErrorCode.BANK_NOT_FOUND));
    }

    Account newAccount = accountRepository.save(CreateAccountRequest.toEntity(request, bank, user));
    AccountResponse response = AccountResponse.fromEntity(newAccount);
    return response;
  }

  @Transactional(readOnly = true)
  public List<AccountResponse> getAccounts(long userId) {
    List<Account> accounts = accountRepository.findByUserIdAndStatus(userId, Account.STATUS_ACTIVE);
    List<AccountResponse> responses = accounts.stream().map(AccountResponse::fromEntity).toList();
    return responses;
  }
}
