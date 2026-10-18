package com.cuenta.server.modules.card.repository;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cuenta.server.modules.card.entity.Card;

@Repository
public interface CardRepository extends JpaRepository<Card, Long> {

  @EntityGraph(attributePaths = "issuer")
  List<Card> findByUserIdAndStatusOrderByIdAsc(long userId, String status);

  boolean existsByAccountIdAndStatus(long accountId, String status);
}
