package com.cuenta.server.modules.auth.request;

import com.cuenta.server.global.constants.PasswordPolicy;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class ResetPasswordRequest {

  @NotNull()
  private UUID token;

  @NotBlank()
  @Pattern(regexp = PasswordPolicy.REGEX, message = PasswordPolicy.MESSAGE)
  @ToString.Exclude
  private String newPassword;
}
