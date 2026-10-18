package com.cuenta.server.modules.card.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.cuenta.server.modules.account.entity.Account;
import com.cuenta.server.modules.card.request.CardRequest;
import com.cuenta.server.modules.cardissuer.entity.CardIssuer;
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
@Table(name = "cards")
public class Card {
  public static final String STATUS_ACTIVE = "ACTIVE";
  public static final String STATUS_CLOSED = "CLOSED";
  public static final String TYPE_CREDIT = "CREDIT";
  public static final String TYPE_DEBIT = "DEBIT";

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "issuer_id", nullable = false)
  private CardIssuer issuer;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "account_id", nullable = false)
  private Account account;

  @Column(name = "name", nullable = false, columnDefinition = "VARCHAR(100)")
  private String name;

  @Column(name = "card_type", nullable = false, columnDefinition = "VARCHAR(20)")
  private String cardType;

  @Column(name = "last_four_digits", nullable = true, columnDefinition = "VARCHAR(4)")
  private String lastFourDigits;

  @Column(name = "credit_limit", nullable = true)
  private Long creditLimit;

  @Column(name = "billing_day", nullable = true)
  private Integer billingDay;

  @Column(name = "payment_due_day", nullable = true)
  private Integer paymentDueDay;

  @Column(name = "status", nullable = false, columnDefinition = "VARCHAR(20)")
  private String status;

  @CreationTimestamp
  @Column(name = "created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt;

  @UpdateTimestamp
  @Column(name = "updated_at", nullable = true)
  private LocalDateTime updatedAt;

  public boolean isCredit() {
    return TYPE_CREDIT.equals(this.cardType);
  }

  public void close() {
    this.status = STATUS_CLOSED;
  }

  public void update(CardRequest request, CardIssuer issuer, Account account) {
    boolean credit = TYPE_CREDIT.equals(request.getCardType());
    this.issuer = issuer;
    this.account = account;
    this.name = request.getName();
    this.cardType = request.getCardType();
    this.lastFourDigits = request.getLastFourDigits();
    this.creditLimit = credit ? request.getCreditLimit() : null;
    this.billingDay = credit ? request.getBillingDay() : null;
    this.paymentDueDay = credit ? request.getPaymentDueDay() : null;
  }
}
