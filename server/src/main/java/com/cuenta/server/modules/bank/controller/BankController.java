package com.cuenta.server.modules.bank.controller;

import org.springframework.web.bind.annotation.RestController;

import com.cuenta.server.global.api.Api;
import com.cuenta.server.modules.bank.response.BankResponse;
import java.util.List;
import com.cuenta.server.modules.bank.service.BankService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import lombok.RequiredArgsConstructor;

@Tag(name = "Banks", description = "은행 API")
@RestController
@RequestMapping("banks")
@RequiredArgsConstructor
public class BankController {

  private final BankService bankService;

  @GetMapping
  public Api<List<BankResponse>> getBanks() {
    List<BankResponse> response = bankService.getBanks();
    return Api.OK(response);
  }
}
