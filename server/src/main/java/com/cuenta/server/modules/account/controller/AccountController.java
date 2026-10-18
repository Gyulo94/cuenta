package com.cuenta.server.modules.account.controller;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import com.cuenta.server.modules.account.request.AccountRequest;
import lombok.RequiredArgsConstructor;

import com.cuenta.server.global.annotations.CurrentUser;
import com.cuenta.server.global.api.Api;
import com.cuenta.server.global.jwt.JwtPayload;
import com.cuenta.server.modules.account.response.AccountResponse;
import com.cuenta.server.modules.account.service.AccountService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "Accounts", description = "계좌 API")
@RestController
@RequestMapping("accounts")
@RequiredArgsConstructor
public class AccountController {
  private final AccountService accountService;

  @PostMapping
  @Operation(summary = "계좌 생성", description = "새로운 계좌를 생성합니다.")
  public Api<AccountResponse> createAccount(@Valid @RequestBody AccountRequest request,
      @CurrentUser JwtPayload user) {
    AccountResponse response = accountService.createAccount(request, user.getId());
    return Api.OK(response);
  }

  @GetMapping
  @Operation(summary = "계좌 목록 조회", description = "사용자의 모든 계좌 목록을 조회합니다.")
  public Api<List<AccountResponse>> getAccounts(@CurrentUser JwtPayload user) {
    List<AccountResponse> response = accountService.getAccounts(user.getId());
    return Api.OK(response);
  }

  @GetMapping("/{id}")
  @Operation(summary = "계좌 조회", description = "사용자의 특정 계좌를 조회합니다.")
  public Api<AccountResponse> getAccountById(@PathVariable("id") Long id,
      @CurrentUser JwtPayload user) {
    AccountResponse response = accountService.getAccountById(id, user.getId());
    return Api.OK(response);
  }

  @PutMapping("/{id}")
  @Operation(summary = "계좌 수정", description = "사용자의 특정 계좌 정보를 수정합니다.")
  public Api<AccountResponse> updateAccount(@PathVariable("id") Long id,
      @Valid @RequestBody AccountRequest request,
      @CurrentUser JwtPayload user) {
    AccountResponse response = accountService.updateAccount(id, request, user.getId());
    return Api.OK(response);
  }

  @DeleteMapping("/{id}")
  @Operation(summary = "계좌 삭제", description = "사용자의 특정 계좌를 삭제합니다.")
  public Api<Void> deleteAccount(@PathVariable("id") Long id,
      @CurrentUser JwtPayload user) {
    accountService.deleteAccount(id, user.getId());
    return Api.OK();
  }
}
