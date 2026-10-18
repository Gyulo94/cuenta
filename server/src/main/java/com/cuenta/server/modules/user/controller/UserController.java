package com.cuenta.server.modules.user.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

import com.cuenta.server.global.annotations.CurrentUser;
import com.cuenta.server.global.api.Api;
import com.cuenta.server.global.jwt.JwtPayload;
import com.cuenta.server.modules.user.response.UserResponse;
import com.cuenta.server.modules.user.service.UserService;

@Tag(name = "Users", description = "사용자 API")
@RestController
@RequestMapping("users")
@RequiredArgsConstructor
public class UserController {
  private final UserService userService;

  @Operation(summary = "로그인 세션 조회")
  @GetMapping("session")
  public Api<UserResponse> getSession(@Parameter(hidden = true) @CurrentUser JwtPayload user) {
    UserResponse response = userService.getSession(user.getId());
    return Api.OK(response);
  }
}
