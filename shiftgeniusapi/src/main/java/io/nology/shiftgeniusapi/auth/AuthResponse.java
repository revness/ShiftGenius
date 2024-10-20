package io.nology.shiftgeniusapi.auth;

import lombok.Getter;
import lombok.Setter;

public class AuthResponse {

    @Getter
    @Setter
    private String token;

    @Getter
    @Setter
    private String userName;

    @Getter
    @Setter
    private String email;

    public AuthResponse() {
    }

    public AuthResponse(String token, String userName, String email) {
        this.token = token;
        this.userName = userName;
        this.email = email;
    }

}
