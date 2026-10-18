package com.cuenta.server.modules.cardissuer.entity;

import com.cuenta.server.modules.bank.entity.Bank;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "card_issuers")
public class CardIssuer {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "bank_id", nullable = true)
  private Bank bank;

  @Column(name = "code", nullable = false, unique = true, columnDefinition = "VARCHAR(20)")
  private String code;

  @Column(name = "name", nullable = false, columnDefinition = "VARCHAR(100)")
  private String name;

  @Column(name = "logo", nullable = true, columnDefinition = "TEXT")
  private String logo;

  @Column(name = "is_active", nullable = false)
  private boolean isActive;
}
