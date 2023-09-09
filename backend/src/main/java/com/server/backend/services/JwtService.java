package com.server.backend.services;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;

@Service
public class JwtService {

    @Value("${com.server.backend.jwtSecret}")
    private String SECRET_KEY;

    @Value("${com.server.backend.jwtExpiration}")
    private Long JWT_EXPIRATION;

    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolve) {
        final Claims claims = extractAllClaims(token);
        
        return claimsResolve.apply(claims);
    }

    // get email
    public String extractUserEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // get expire time
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // user info to token
    public String generateToken(Map<String, Object> extractClaims, UserDetails userDetails) {
        return Jwts
                .builder()
                .setClaims(extractClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 60000 * JWT_EXPIRATION))
                .signWith(Keys.hmacShaKeyFor(getSignInKey()), SignatureAlgorithm.HS256)
                .compact();
    }

    // user info to token
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    // check expire token
    public boolean isTokenExpired(String token) {
        try {
            return !extractExpiration(token).before(new Date());
        } catch (SignatureException e) {
            System.err.println(String.format("Invalid JWT signature: {}", e.getMessage()));
        } catch (MalformedJwtException e) {
            System.err.println(String.format("Invalid JWT token: {}", e.getMessage()));
        } catch (ExpiredJwtException e) {
            System.err.println(String.format("JWT token is expired: {}", e.getMessage()));
        } catch (UnsupportedJwtException e) {
            System.err.println(String.format("JWT token is unsupported: {}", e.getMessage()));
        } catch (IllegalArgumentException e) {
            System.err.println(String.format("JWT claims string is empty: {}", e.getMessage()));
        }
        return false;
    }
    private byte[] getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return keyBytes;
    }
}
