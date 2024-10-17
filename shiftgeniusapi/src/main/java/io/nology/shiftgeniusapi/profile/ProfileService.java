package io.nology.shiftgeniusapi.profile;

import io.nology.shiftgeniusapi.auth.User;
import io.nology.shiftgeniusapi.auth.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class ProfileService {

  @Autowired
  private UserRepository userRepository;

  public User createProfile(ProfileCreateDTO data) throws Exception {

    String userEmail = getAuthenticatedUserEmail();
    Optional<User> optionalUser = userRepository.findByEmail(userEmail);

    if (optionalUser.isEmpty()) {
      throw new Exception("User not found");
    }

    User user = optionalUser.get();

    user.setPosition(data.getPosition());
    user.setDepartment(data.getDepartment());
    user.setPhone(data.getPhone());

    return userRepository.save(user);
  }

  private String getAuthenticatedUserEmail() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication == null || !authentication.isAuthenticated()) {
      throw new RuntimeException("Unauthenticated user");
    }
    return authentication.getName(); // getUsername() returns email
  }
}
