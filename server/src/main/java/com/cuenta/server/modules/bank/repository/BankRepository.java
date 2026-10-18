package com.cuenta.server.modules.bank.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cuenta.server.modules.bank.entity.Bank;

@Repository
public interface BankRepository extends JpaRepository<Bank, Long> {

  List<Bank> findAllByIsActiveTrue();

  Optional<Bank> findByIdAndIsActiveTrue(Long id);
}
