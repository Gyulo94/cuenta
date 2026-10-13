package com.cuenta.server.modules.auth.service;

import java.util.Map;
import com.cuenta.server.modules.auth.request.ResetPasswordRequest;
import com.cuenta.server.modules.auth.request.AuthRequest;
import com.cuenta.server.modules.auth.response.TokenResponse;
import com.cuenta.server.modules.user.request.CreateUserRequest;

public interface AuthService {

  void register(CreateUserRequest request);

  void verify(Map<String, String> request);

  TokenResponse login(AuthRequest request);

  void resetPassword(ResetPasswordRequest request);

  void sendResetPasswordMail(Map<String, String> request);

}
