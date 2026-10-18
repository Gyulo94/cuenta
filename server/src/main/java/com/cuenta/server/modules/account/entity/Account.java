package com.cuenta.server.modules.account.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.cuenta.server.modules.account.request.AccountRequest;
import com.cuenta.server.modules.bank.entity.Bank;
import com.cuenta.server.modules.user.entity.User;

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
@Table(name = "accounts")
public class Account {
  public static final String STATUS_ACTIVE = "ACTIVE";
  public static final String STATUS_INACTIVE = "INACTIVE";
  public static final String TYPE_ACCOUNT = "ACCOUNT";
  public static final String TYPE_CASH = "CASH";
  public static final String CASH_WALLET_NAME = "현금지갑";

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "bank_id", nullable = true)
  private Bank bank;

  @Column(name = "name", nullable = false, columnDefinition = "VARCHAR(100)")
  private String name;

  @Column(name = "account_number", nullable = true, columnDefinition = "VARCHAR(50)")
  private String accountNumber;

  @Column(name = "account_type", nullable = false, columnDefinition = "VARCHAR(20)")
  private String accountType;

  @Column(name = "initial_balance", nullable = false)
  private long initialBalance;

  @Column(name = "balance", nullable = false)
  private long balance;

  @Column(name = "status", nullable = false, columnDefinition = "VARCHAR(20)")
  private String status;

  @CreationTimestamp
  @Column(name = "created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt;

  @UpdateTimestamp
  @Column(name = "updated_at", nullable = true)
  private LocalDateTime updatedAt;

  public void setStatus(String status) {
    this.status = status;
  }

  /**
   * 사용자의 기본 현금지갑 생성
   *
   * @param user 소유 사용자
   * @return 잔액 0원의 현금지갑
   */
  public static Account cashWallet(User user) {
    return Account.builder()
        .user(user)
        .name(CASH_WALLET_NAME)
        .accountType(TYPE_CASH)
        .initialBalance(0)
        .balance(0)
        .status(STATUS_ACTIVE)
        .build();
  }

  public boolean isCash() {
    return TYPE_CASH.equals(this.accountType);
  }

  public void update(AccountRequest request, Bank bank) {
    this.name = request.getName();
    this.accountNumber = request.getAccountNumber();
    this.balance += request.getInitialBalance() - this.initialBalance;
    this.initialBalance = request.getInitialBalance();
    this.bank = bank;
  }
}