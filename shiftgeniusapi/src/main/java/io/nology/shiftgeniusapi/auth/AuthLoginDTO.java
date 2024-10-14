package io.nology.shiftgeniusapi.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

public class AuthLoginDTO {

    @NotBlank
    @Getter
    @Setter
    private String email;

    @NotBlank
    @Getter
    @Setter
    private String password;

    public AuthLoginDTO() {
    }

    public AuthLoginDTO(String email, String password) {
        this.email = email;
        this.password = password;
    }

}
