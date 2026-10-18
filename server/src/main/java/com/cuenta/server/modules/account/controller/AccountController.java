package com.cuenta.server.modules.account.controller;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import com.cuenta.server.modules.account.request.CreateAccountRequest;
import lombok.RequiredArgsConstructor;

import com.cuenta.server.global.annotations.CurrentUser;
import com.cuenta.server.global.api.Api;
import com.cuenta.server.global.jwt.JwtPayload;
import com.cuenta.server.modules.account.response.AccountResponse;
import com.cuenta.server.modules.account.service.AccountService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "Accounts", description = "계좌 API")
@RestController
@RequestMapping("accounts")
@RequiredArgsConstructor
public class AccountController {
  private final AccountService accountService;

  @PostMapping
  public Api<AccountResponse> createAccount(@Valid @RequestBody CreateAccountRequest request,
      @CurrentUser JwtPayload user) {
    AccountResponse response = accountService.createAccount(request, user.getId());
    return Api.OK(response);
  }

  @GetMapping
  public Api<List<AccountResponse>> getAccounts(@CurrentUser JwtPayload user) {
    List<AccountResponse> response = accountService.getAccounts(user.getId());
    return Api.OK(response);
  }
}
