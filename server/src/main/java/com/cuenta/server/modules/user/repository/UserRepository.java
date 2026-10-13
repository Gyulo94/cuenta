package com.cuenta.server.modules.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cuenta.server.modules.user.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
