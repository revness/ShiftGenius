package io.nology.shiftgeniusapi.profile;

import lombok.Getter;
import lombok.Setter;
import java.util.List;
import java.util.stream.Collectors;

import io.nology.shiftgeniusapi.auth.User;

public class UserResponseDTO {
  @Getter
  @Setter
  private Long id;

  @Getter
  @Setter
  private String email;

  @Getter
  @Setter
  private String position;

  @Getter
  @Setter
  private String department;

  @Getter
  @Setter
  private String phone;

  @Getter
  @Setter
  private List<String> authorities;

  @Getter
  @Setter
  private String username;

  // Default Constructor
  public UserResponseDTO() {
  }

  // Constructor to initialize from User entity
  public UserResponseDTO(User user) {
    this.id = user.getId();
    this.email = user.getEmail();
    this.position = user.getPosition();
    this.department = user.getDepartment();
    this.phone = user.getPhone();
    this.authorities = user.getAuthorities().stream()
        .map(auth -> auth.getAuthority())
        .collect(Collectors.toList());
    this.username = user.getUsername();
  }
}
