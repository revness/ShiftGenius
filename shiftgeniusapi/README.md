# Spring Security

## What is the difference between authorization and authentication?

**Authentication** is the process of verifying the identity of a user, system, or entity trying to access a resource or system. It answers the question, "Who are you?"

**Authorization** is the process of granting or denying access to specific resources or functionalities to authenticated users or entities. It answers the question, "What are you allowed to do?"

## How to add Spring Security to a project?

pom.xml file

```
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

## How does Spring Security default auth work?

Go to http://localhost:8080/login in the browser

Spring provides a login form that can be used to authenticate a user.

Username: user
Password: (printed in the console)

Add the following line to application.properties to see what filters get invoked in Spring security Filter Chain: `logging.level.org.springframework.security=TRACE`

Default flow
![Default auth flow](./spring_default_auth_flow.png)

```java
@Bean
@Order(SecurityProperties.BASIC_AUTH_ORDER)
SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
	http.authorizeHttpRequests((requests) -> requests.anyRequest().authenticated());
	http.formLogin(withDefaults());
	http.httpBasic(withDefaults());
	return http.build();
	}

```

[SpringBootWebSecurityConfiguration](https://github.com/spring-projects/spring-boot/blob/main/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/security/servlet/SpringBootWebSecurityConfiguration.java)

1. [UsernamePasswordAuthenticationFilter](https://github.com/spring-projects/spring-security/blob/main/web/src/main/java/org/springframework/security/web/authentication/UsernamePasswordAuthenticationFilter.java#L48)
2. [BasicAuthenticationFilter](https://github.com/spring-projects/spring-security/blob/main/web/src/main/java/org/springframework/security/web/authentication/www/BasicAuthenticationFilter.java)
3. AuthenticationManager -> [DaoAuthenticationProvider](https://github.com/spring-projects/spring-security/blob/main/core/src/main/java/org/springframework/security/authentication/dao/DaoAuthenticationProvider.java)
4. [InMemoryUserDetailsManager](https://github.com/spring-projects/spring-security/blob/main/core/src/main/java/org/springframework/security/provisioning/InMemoryUserDetailsManager.java)

#### What is the chain of responsibility design pattern?

The Chain of Responsibility design pattern is a behavioral pattern that allows multiple objects to handle a request without knowing which object will handle it. Each object in the chain either handles the request or passes it to the next object in the chain until the request is processed or reaches the end of the chain.

#### How does Form Auth work?

Users enter their credentials on a login page.

Credentials Sent: These credentials are sent securely to the web server.

Server Authentication: The server checks the credentials against a database to verify the user's identity.

#### How does Basic Auth work?

![Basic Auth](./basic_auth.png)

The server sends back a header stating it requires authentication for a given realm. The user provides the username and password, which the browser concatenates (username + ":" + password), and base64 encodes. This encoded string is then sent using an "Authorization"-header on each request from the browser. Because the credentials are only encoded, not encrypted, this is highly insecure unless it is sent over https.

#### What is Spring SecurityContextHolder?

The primary purpose of the SecurityContextHolder is to provide access to the current security context, which includes details about the authenticated user, their roles, and other security-related information.

The SecurityContext is often stored within the SecurityContextHolder, allowing you to retrieve and manipulate it when needed.

SecurityContextHolder is a mechanism for managing and accessing the SecurityContext within a thread. The SecurityContext itself represents the current security state of an application, including user authentication and authorization details. Together, these components help Spring Security manage and enforce security within your application.

[SecurityContextHolder](https://github.com/spring-projects/spring-security/blob/main/core/src/main/java/org/springframework/security/core/context/SecurityContextHolder.java)

#### What is UsernamePasswordAuthenticationToken?

UsernamePasswordAuthenticationToken is a specific implementation of the Authentication interface used for representing an authentication request when a user provides a username and password for authentication. It is a common way to encapsulate the user's credentials during the authentication process.

When a user submits their credentials (typically in a login form), the application creates a UsernamePasswordAuthenticationToken containing the provided username and password. This token is then passed to Spring Security for authentication.

[UsernamePasswordAuthenticationToken](https://github.com/spring-projects/spring-security/blob/main/core/src/main/java/org/springframework/security/authentication/UsernamePasswordAuthenticationToken.java)

## What is Json Web Token?

JWT stands for "JSON Web Token." It is a compact, self-contained means of representing information between two parties in a way that can be easily verified and trusted. JWTs are commonly used for secure data exchange between a client and a server.

JWTs consist of three parts separated by dots (.):

Header: Contains metadata about the type of token and the signing algorithm used.
Payload: Contains claims or statements about the user or entity and additional data. Common claims include user ID, username, and expiration time.
Signature: A cryptographic signature generated using a secret key. It's used to verify that the sender of the JWT is who it says it is and to ensure that the message wasn't tampered with during transmission.

[What is JWT?](https://www.youtube.com/watch?v=7Q17ubqLfaM)

## How to set up security using JWT in Spring?

![Auth with JWT](./jwt_auth.png)
pom.xml

```
<dependency>
	<groupId>io.jsonwebtoken</groupId>
	<artifactId>jjwt-api</artifactId>
	<version>0.11.5</version>
</dependency>
<dependency>
	<groupId>io.jsonwebtoken</groupId>
	<artifactId>jjwt-impl</artifactId>
	<version>0.11.5</version>
</dependency>
<dependency>
	<groupId>io.jsonwebtoken</groupId>
	<artifactId>jjwt-jackson</artifactId>
	<version>0.11.5</version>
</dependency>
```

#### Creating custom SecurityConfiguration

```java
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

	private final JwtAuthFilter jwtAuthFilter;

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
		.csrf(CsrfConfigurer::disable)
		.authorizeHttpRequests(
				(requests) -> requests
				.anyRequest()
				.authenticated()
				)
			 .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
			 .sessionManagement(session -> session
		                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
		     );

		return http.build();
	}
}

```

#### Creating JwtAuthFilter

```java
@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

	private final UserDetailsService userDetailsService;
	private final JwtService jwtService;

	@Override
	protected void doFilterInternal(
				HttpServletRequest request,
				HttpServletResponse response,
				FilterChain filterChain
			)
			throws ServletException, IOException {

		final String authHeader = request.getHeader("Authorization");
		final String userEmail;
		final String jwtToken;

		if(authHeader == null || !authHeader.startsWith("Bearer")) {
			  filterChain.doFilter(request, response);
			  return;
		}

		jwtToken = authHeader.substring(7);
		userEmail = this.jwtService.extractUsername(jwtToken);

		if(userEmail != null & SecurityContextHolder.getContext().getAuthentication() == null) {
			 UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);

			if(this.jwtService.isTokenValid(jwtToken, userDetails)) {

				UsernamePasswordAuthenticationToken authToken =
						new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

				authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(authToken);
			}
		}

		filterChain.doFilter(request, response);
	}

}
```

#### Creating JwtService

```java
@Component
public class JwtService {

    // replace
	private static final String SECRET_KEY = "c157949ca9b029e440f929b26c928bc1834a6dae7e9f56262de13053b966a588";

	public String extractUsername(String token) {
		return extractClaims(token, Claims::getSubject);

	}

	public boolean isTokenValid(String token, UserDetails userDetails) {
		final String username = extractUsername(token);
		return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
	}

	private boolean isTokenExpired(String token) {
		return extractExpiration(token).before(new Date());
	}

	private Date extractExpiration(String token) {
		return extractClaims(token, Claims::getExpiration);
	}


	public String generateToken(
		Map<String, Object> extraClaims,
		UserDetails userDetails
	) {
		return Jwts
				.builder()
				.setClaims(extraClaims)
				.setSubject(userDetails.getUsername())
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + 1000 * 3600 * 24))
				.signWith(getSigninKey(), SignatureAlgorithm.HS256)
				.compact();
	}

	public String generateToken(UserDetails userDetails) {
		  return generateToken(new HashMap<>(), userDetails);
    }

	public <T> T extractClaims(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = extractAllClaims(token);
		return claimsResolver.apply(claims);
	}

	private Claims extractAllClaims(String token) {
		return Jwts
				.parserBuilder()
				.setSigningKey(getSigninKey())
				.build()
				.parseClaimsJws(token)
				.getBody();
	}

	private Key getSigninKey() {
		// decode secret key to a byte array
		byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);

		//  HMAC key for SHA (Secure Hash Algorithm), is a cryptographic key used in HMAC
		// (Hash-based Message Authentication Code) operations.
		// HMAC is a construction for creating a secure way to verify both
		// the integrity and authenticity of a message or data.
		return Keys.hmacShaKeyFor(keyBytes);
	}
}
```

#### Setting up User Spring layers

```java
public enum Role {
  ADMIN, STANDARD_USER
}

@Entity
@Table(name = "users")
public class User implements UserDetails {

	private static final long serialVersionUID = 1L;

	@Getter
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Getter
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

	@Enumerated(EnumType.STRING)
	private Role role;

	public User() {}

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

```

```java
public interface UserRepository extends JpaRepository<User, Long>{

	Optional<User> findByEmail(String email);

}

```

#### Creating AppConfiguartion with custom implementation of UserDetailsService

```java
@Configuration
public class AppConfig {

@Autowired
private final UserRepository repository;

	@Bean
	public UserDetailsService userDetailsService() {
			return username -> repository.findByEmail(username)
			        .orElse(null);
	}
}

```

#### Adding the rest of the required beans to AppConfig

```java
@Configuration
@RequiredArgsConstructor
public class AppConfig {

private final UserRepository repository;

	@Bean
	public UserDetailsService userDetailsService() {
			return username -> repository.findByEmail(username)
			        .orElse(null);
	}

	@Bean
	public AuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
		authProvider.setUserDetailsService(userDetailsService());
		authProvider.setPasswordEncoder(passwordEncoder());
		return authProvider;
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

}
```

#### Creating Auth package with all classes required to register a new User

```java
@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	private AuthService authService;

	@PostMapping("/register")
	public ResponseEntity<AuthResponse> register(
			@RequestBody AuthRegisterDTO data
	) {
		AuthResponse res = this.authService.register(data);
		return new ResponseEntity<AuthResponse>(res, HttpStatus.OK);
	}

}
```

```java
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
	private String password;

	public AuthRegisterDTO(){}

	public AuthRegisterDTO(String userName,  String email, String password){
		this.userName = userName;
		this.email = email;
		this.password = password;
	}
}
```

```java
public class AuthResponse {

	@Getter
	@Setter
	private String token;

	public AuthResponse(){}

	public AuthResponse(String token) {
		this.token = token;
	}

}
```

```java
@Service
public class AuthService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private final PasswordEncoder passwordEncoder;

	@Autowired
	private final JwtService jwtService;

	@Autowired
	private final AuthenticationManager authManager;

	public AuthResponse register(AuthRegisterDTO data) {
		User user = new User(data.getUserName(),
				data.getEmail(),
				passwordEncoder.encode(data.getPassword()));

		userRepository.save(user);
		String token = jwtService.generateToken(user);
		return new AuthResponse(token);

	}
}
```

#### Adding login functionality

```java
public class AuthLoginDTO {

	@NotBlank
	@Getter
	@Setter
	private String email;

	@NotBlank
	@Getter
	@Setter
	private String password;

	public AuthLoginDTO() {}

	public AuthLoginDTO(String email, String password) {
		this.email = email;
		this.password = password;
	}

}
```

In AuthController.java

```java
@PostMapping("/login")
public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthLoginDTO data) {
	return new ResponseEntity<>(service.login(data), HttpStatus.OK);
}
```

In AuthService.java

```java

public AuthResponse login(AuthLoginDTO data) {

		UsernamePasswordAuthenticationToken token =  new UsernamePasswordAuthenticationToken(
	            data.getEmail(),
	            data.getPassword()
	        );


		authManager.authenticate(token);

		User user = userRepository.findByEmail(data.getEmail()).orElseThrow(
				() -> new NotFoundException("Incorrect login details"));
		String jwtToken = jwtService.generateToken(user);
		return new AuthResponse(jwtToken);
	}
```

#### Adding a public and private endpoint

```java
@RestController
@RequestMapping("/greetings")
public class GreetingController {

	@GetMapping
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
```

#### Updating the security filter chain

```java
	@Bean
	SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
		http
		.csrf(CsrfConfigurer::disable)
		.authorizeHttpRequests(
				(requests) -> requests
				.requestMatchers("/auth/login")
				.permitAll()
				.requestMatchers("/auth/register")
				.permitAll()
				.requestMatchers("/greetings/public")
				.permitAll()
				.anyRequest()
				.authenticated()
				)
			 .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
			 .sessionManagement(session -> session
		                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
		     );

		return http.build();
	}
```

(Optional if enough time)

## Chain of responsibility example

```java
public class Chain {

    Processor chain;

    public Chain() {
        this.buildChain();
    }

    private void buildChain() {
        this.chain = new NegativeProcessor(new ZeroProcessor(new PositiveProcessor(null)));
    }

    public void process(Number request) {
        this.chain.process(request);
    }
}
```

```java
class Number {

    private int number;

    public Number(int number) {
        this.number = number;
    }

    public int getNumber() {
        return this.number;
    }

}
```

```java
abstract class Processor {

    private Processor nextProcessor;

    public Processor(Processor nextProcessor) {
        this.nextProcessor = nextProcessor;
    }

    public void process(Number request) {
        if(nextProcessor != null) {
            nextProcessor.process(request);
        }
    }
}
```

```java
class NegaviteProcessor extends Processor {

    public NegativeProcessor(Processor nextProcessor){
        super(nextProcessor);
    }

    public void process(Number request) {
        if(request.getNumber() < 0) {
            System.out.println("Negative Processor : " + request.getNumber());
        } else {
            super.process(request);
        }
    }
}
```

```java
class ZeroProcessor extends Processor {

    public ZeroProcessor(Processor nextProcessor){
        super(nextProcessor);
    }

     public void process(Number request) {
        if (request.getNumber() == 0) {
            System.out.println("ZeroProcessor : " + request.getNumber());
        } else {
            super.process(request);
        }
    }
}
```

```java
class PositiveProcessor extends Processor {

    public PositiveProcessor(Processor nextProcessor){
        super(nextProcessor);
    }

    public void process(Number request) {
        if(request.getNumber() > 0) {
            System.out.println("PositiveProcessor : " + request.getNumber());
        } else {
            super.process(request);
        }
    }
}
```

```java
class TestChain {

    public static void main(String[] args) {
        Chain chain = new Chain();

        chain.process(new Number(90));
        chain.process(new Number(-50));
        chain.process(new Number(0));
        chain.process(new Number(91));
    }
}
```

## What is a servlet?

Servlet is a class that handles requests, processes them and replies with a response

https://www.baeldung.com/spring-dispatcherservlet
