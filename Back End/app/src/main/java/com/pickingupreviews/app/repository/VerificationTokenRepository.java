package com.pickingupreviews.app.repository;


import com.pickingupreviews.app.entity.User;
import com.pickingupreviews.app.entity.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {
    Optional<VerificationToken> findByToken(String token);
    Optional<VerificationToken> findByUser(User user);
    void deleteByExpiryDateBefore(LocalDateTime now);
}
