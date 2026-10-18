package com.cuenta.server.modules.bank.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

import java.util.List;

import com.cuenta.server.modules.account.entity.Account;

import jakarta.persistence.Column;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "banks")
public class Bank {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @Column(name = "code", nullable = false, columnDefinition = "VARCHAR(20)")
  private String code;

  @Column(name = "name", nullable = false, columnDefinition = "VARCHAR(100)")
  private String name;

  @Column(name = "logo", nullable = true, columnDefinition = "TEXT")
  private String logo;

  @Column(name = "is_active", nullable = false)
  private boolean isActive;

  @OneToMany(mappedBy = "bank")
  private List<Account> accounts;

}
