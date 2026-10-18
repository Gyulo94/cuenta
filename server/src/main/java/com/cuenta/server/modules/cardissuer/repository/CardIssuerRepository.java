package com.cuenta.server.modules.cardissuer.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cuenta.server.modules.cardissuer.entity.CardIssuer;

@Repository
public interface CardIssuerRepository extends JpaRepository<CardIssuer, Long> {

  List<CardIssuer> findAllByIsActiveTrue();

  Optional<CardIssuer> findByIdAndIsActiveTrue(Long id);
}
