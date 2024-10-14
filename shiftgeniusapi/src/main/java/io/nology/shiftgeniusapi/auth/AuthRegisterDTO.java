package io.nology.shiftgeniusapi.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

public class AuthRegisterDTO {

    @NotBlank
    @Getter
    @Setter
    private String userName;

    @Email
    @Getter
    @Setter
    private String email;

    @NotBlank
    @Getter
    private String password;

    public AuthRegisterDTO() {
    }

    public AuthRegisterDTO(String userName, String email, String password) {
        this.userName = userName;
        this.email = email;
        this.password = password;
    }
}
