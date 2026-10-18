package com.cuenta.server.modules.bank.service;

import org.springframework.stereotype.Service;
import com.cuenta.server.modules.bank.repository.BankRepository;

import com.cuenta.server.modules.bank.response.BankResponse;

import lombok.RequiredArgsConstructor;

import com.cuenta.server.modules.bank.entity.Bank;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BankService {

  private final BankRepository bankRepository;

  /**
   * 모든 활성 은행 조회
   *
   * @return 활성 은행 목록
   */
  public List<BankResponse> getBanks() {
    List<Bank> banks = bankRepository.findAllByIsActiveTrue();
    List<BankResponse> bankResponses = banks.stream()
        .map(BankResponse::fromEntity)
        .collect(Collectors.toList());
    return bankResponses;
  }

}
