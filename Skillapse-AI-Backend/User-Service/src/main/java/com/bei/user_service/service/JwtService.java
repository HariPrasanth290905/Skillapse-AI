package com.bei.user_service.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.*;
import java.util.function.Function;

@Service
public class JwtService {


    @Value("${secret.key}")
    private String SECRET_KEY;

    public String generateToken(UUID uuid) {
        System.out.println("Generating token for user: " + uuid);
        Map<String, Object> claims = new HashMap<>();

        return Jwts.builder()
                .claims()
                .add(claims)
                .subject(uuid.toString())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24 * 7)) //1week
                .and()
                .signWith(getKey())
                .compact();

    }
    //key decoder
    private SecretKey getKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
    //get userid
    public String extractUserID(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    //extract claim
    private <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }
    //extract all claims
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
    //token validator
    public boolean validateToken(String token, BeiUserDetails userDetails) {
        final String userId = extractUserID(token);
        return (userDetails.getId().equals(UUID.fromString(userId))
        &&!isTokenExpired(token));
    }
    //expiry check
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
    //extract expiry
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

}