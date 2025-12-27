package com.univ.auth.service;

import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;

@Service
public class AuthService {

    private final UserRepository userRepository;
    // Loading JWT_SECRET from System environment variable otherwise using a default for development only
    private static final String JWT_SECRET = System.getenv("JWT_SECRET") != null
            ? System.getenv("JWT_SECRET")
            : "CHANGE_THIS_DEV_SECRET"; // development fallback only

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Validate credentials against the user store.
    public boolean validateUser(String username, String password) {
        return userRepository.isValid(username, password);
    }

    /**
     * Generate a signed JWT for the provided username.
     * This replaces the previous placeholder string. The token is signed using
     * HMAC-SHA256 (HS256) and includes standard claims: subject, issuedAt, expiresAt.
     */
    /**
     * Generate a signed JWT for the provided username and optional roles.
     * If no roles are passed, the token will include the default role `USER`.
     */
    public String generateJwt(String username, String[] roles) {
        Algorithm alg = Algorithm.HMAC256(JWT_SECRET);
        Date now = new Date();
        // Token lifetime: 1 hour (adjust as needed)
        Date exp = new Date(now.getTime() + 3600_000);

        String[] tokenRoles = (roles == null || roles.length == 0) ? new String[]{"Student"} : roles;

        return JWT.create()
                .withSubject(username)
                .withArrayClaim("roles", tokenRoles)
                .withIssuedAt(now)
                .withExpiresAt(exp)
                .sign(alg);
    }

    public boolean registerUser(String name, String prename, String username,String phone, String email, String password,String role, String sector) {
        return userRepository.registerUser(name, prename, username, phone, email, password, role, sector);
    }

    /**
     * Verify a JWT's signature and expiration.
     * Returns true if the token is correctly signed with the configured secret and
     * is not expired. Additional claim checks (issuer, audience, roles) can be added.
     * Validate the token and ensure it contains the requested role (if non-null).
     * Role check is case-insensitive.
     */
    public boolean validateJwt(String token, String requiredRole) {
        try {
            Algorithm alg = Algorithm.HMAC256(JWT_SECRET);
            JWTVerifier verifier = JWT.require(alg).build();
            DecodedJWT jwt = verifier.verify(token);

            if (requiredRole == null || requiredRole.isBlank()) {
                return true; // signature/expiry already validated
            }

            List<String> roles = jwt.getClaim("roles").asList(String.class);
            if (roles == null || roles.isEmpty()) return false;
            for (String r : roles) {
                if (r != null && r.equalsIgnoreCase(requiredRole)) return true;
            }
            return false; // requiredRole not present in token
        } catch (JWTVerificationException | IllegalArgumentException e) {
            // Verification failed (invalid signature, expired token, etc.)
            return false;
        }
    }
}