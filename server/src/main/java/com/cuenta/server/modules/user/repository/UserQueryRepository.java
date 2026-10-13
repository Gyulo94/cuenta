package com.cuenta.server.modules.user.repository;

import static com.cuenta.server.modules.user.entity.QUser.user;

import java.util.Locale;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.cuenta.server.modules.user.entity.User;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class UserQueryRepository {

  private final JPAQueryFactory queryFactory;

  public Optional<User> findActiveByEmail(String email) {
    return Optional.ofNullable(
        queryFactory
            .selectFrom(user)
            .where(
                user.email.lower().eq(normalizeEmail(email)),
                user.deletedAt.isNull())
            .fetchOne());
  }

  public boolean existsActiveByEmail(String email) {
    return queryFactory
        .selectOne()
        .from(user)
        .where(
            user.email.lower().eq(normalizeEmail(email)),
            user.deletedAt.isNull())
        .fetchFirst() != null;
  }

  private String normalizeEmail(String email) {
    return email.toLowerCase(Locale.ROOT);
  }
}
