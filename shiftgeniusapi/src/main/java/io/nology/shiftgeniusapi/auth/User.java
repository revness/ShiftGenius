package io.nology.shiftgeniusapi.auth;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import java.util.List;
import java.util.Collection;
import java.util.Set;
import io.nology.shiftgeniusapi.timesheet.Timesheet;

@Entity
@Table(name = "users")
public class User implements UserDetails {

    private static final long serialVersionUID = 1L;

    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @Column
    private String userName;

    @Getter
    @Setter
    @Column(unique = true)
    private String email;

    @Getter
    @Setter
    @Column
    private String password;

    @Getter
    @Enumerated(EnumType.STRING)
    private Role role;

    @Getter
    @Setter
    @Column
    private String position; // Receptionist, Manager, etc.

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<Timesheet> timesheets;

    @Getter
    @Setter
    @Column
    private String department; // nursing, management, etc.

    @Getter
    @Setter
    @Column
    private String phone;

    public User() {
    }

    public User(String userName, String email, String password) {
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.role = Role.STANDARD_USER;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(this.role.name()));
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    public String getUserName() {
        return this.userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}