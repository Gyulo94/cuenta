package com.cuenta.server.modules.user.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;

import com.cuenta.server.global.annotations.CurrentUser;
import com.cuenta.server.global.api.Api;
import com.cuenta.server.global.jwt.JwtPayload;
import com.cuenta.server.modules.user.response.UserResponse;
import com.cuenta.server.modules.user.service.UserService;

@RestController
@RequestMapping("user")
@RequiredArgsConstructor
public class UserController {
  private final UserService userService;

  @GetMapping("session")
  public Api<UserResponse> getSession(@CurrentUser JwtPayload user) {
    UserResponse response = userService.getSession(user.getId());
    return Api.OK(response);
  }
}
