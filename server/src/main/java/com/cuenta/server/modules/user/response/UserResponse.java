package com.cuenta.server.modules.user.response;

import java.time.LocalDateTime;

import com.cuenta.server.modules.user.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {
  private long id;
  private String name;
  private String email;
  private String image;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;
  private LocalDateTime deletedAt;

  public static UserResponse fromEntity(User user) {

    return UserResponse.builder()
        .id(user.getId())
        .name(user.getName())
        .email(user.getEmail())
        .image(user.getImage())
        .createdAt(user.getCreatedAt())
        .updatedAt(user.getUpdatedAt())
        .deletedAt(user.getDeletedAt())
        .build();
  }
}
