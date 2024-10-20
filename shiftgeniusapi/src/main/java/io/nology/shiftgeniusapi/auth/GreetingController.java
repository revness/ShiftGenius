package io.nology.shiftgeniusapi.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/greetings")
public class GreetingController {

    @GetMapping("/protected")
    public ResponseEntity<String> sayHello() {
        return new ResponseEntity<String>("Hello from a protected endpoint",
                HttpStatus.OK);
    }

    @GetMapping("/public")
    public ResponseEntity<String> sayHelloToEveryone() {
        return new ResponseEntity<String>("Hello from a public endpoint",
                HttpStatus.OK);
    }

}