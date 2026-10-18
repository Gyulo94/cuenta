package com.cuenta.server.modules.account.repository;

import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import com.cuenta.server.modules.account.entity.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

  @EntityGraph(attributePaths = "bank")
  List<Account> findByUserIdAndStatus(long userId, String status);

}
