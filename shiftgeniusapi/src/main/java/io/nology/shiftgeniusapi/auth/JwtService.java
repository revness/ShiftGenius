package io.nology.shiftgeniusapi.auth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.security.Key;
import java.util.Date;

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
            UserDetails userDetails) {
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

        // HMAC key for SHA (Secure Hash Algorithm), is a cryptographic key used in HMAC
        // (Hash-based Message Authentication Code) operations.
        // HMAC is a construction for creating a secure way to verify both
        // the integrity and authenticity of a message or data.
        return Keys.hmacShaKeyFor(keyBytes);
    }
}