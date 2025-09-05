package com.bei.user_service.repo;

import com.bei.user_service.model.BeiUsers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface UserRepo extends JpaRepository<BeiUsers, UUID> {
    List<BeiUsers> getBeiUsersById(UUID id);
}
