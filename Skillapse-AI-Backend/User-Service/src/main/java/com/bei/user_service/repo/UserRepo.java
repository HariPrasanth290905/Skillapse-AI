package com.bei.user_service.repo;

import com.bei.user_service.model.BeiUsers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepo extends JpaRepository<BeiUsers, UUID> {


    @Query(value = "SELECT * FROM bei_users WHERE username = :username", nativeQuery = true)
    Optional<BeiUsers> findByUsernameCaseSensitive(String username);


    BeiUsers findByEmail(String contactEmail);
}
