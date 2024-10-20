package io.nology.shiftgeniusapi.profile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

import io.nology.shiftgeniusapi.auth.User;
import io.nology.shiftgeniusapi.common.exceptions.NotFoundException;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/profile")
public class ProfileController {

  @Autowired
  private ProfileService profileService;

  @PostMapping("/add")
  public ResponseEntity<UserResponseDTO> createProfile(@Valid @RequestBody ProfileCreateDTO data) throws Exception {
    User createdProfile = this.profileService.createProfile(data);
    UserResponseDTO responseDTO = new UserResponseDTO(createdProfile);
    return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
  }

  @GetMapping("/{id}")
  public ResponseEntity<UserResponseDTO> findUserById(@PathVariable Long id) throws NotFoundException {
    Optional<User> result = this.profileService.findUserById(id);
    User foundUser = result
        .orElseThrow(() -> new NotFoundException("Couldn't find user with id " + id));
    UserResponseDTO responseDTO = new UserResponseDTO(foundUser);
    return new ResponseEntity<>(responseDTO, HttpStatus.OK);
  }

  @PatchMapping("/{id}")
  public ResponseEntity<UserResponseDTO> updateUserById(@PathVariable Long id,
      @Valid @RequestBody ProfileUpdateDTO data) throws Exception {
    Optional<User> result = this.profileService.updateUserById(id, data);
    User foundUser = result
        .orElseThrow(() -> new NotFoundException("Couldn't find user with id " + id));
    UserResponseDTO responseDTO = new UserResponseDTO(foundUser);
    return new ResponseEntity<>(responseDTO, HttpStatus.OK);
  }

}
