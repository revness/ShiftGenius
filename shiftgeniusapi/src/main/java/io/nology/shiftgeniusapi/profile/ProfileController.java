package io.nology.shiftgeniusapi.profile;

import org.apache.el.stream.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.nology.shiftgeniusapi.auth.User;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/profile")
public class ProfileController {

  @Autowired
  private ProfileService profileService;

  @PostMapping("/add")
  public ResponseEntity<User> createProfile(@Valid @RequestBody ProfileCreateDTO data) throws Exception {
    User createProfile = this.profileService.createProfile(data);
    return new ResponseEntity<User>(createProfile, HttpStatus.CREATED);
  }

}
