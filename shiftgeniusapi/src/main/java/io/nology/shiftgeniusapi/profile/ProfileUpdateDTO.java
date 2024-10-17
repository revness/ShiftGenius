package io.nology.shiftgeniusapi.profile;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

public class ProfileUpdateDTO {

  @NotBlank(message = "Position is required")
  @Getter
  @Setter
  private String position;

  @NotBlank(message = "Department is required")
  @Getter
  @Setter
  private String department;

  @Size(min = 10, max = 15, message = "Phone number should be valid and between 10 to 15 characters")
  @Getter
  @Setter
  private String phone;

}
