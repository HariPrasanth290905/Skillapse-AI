package com.bei.user_service.repo;

import com.bei.user_service.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ContactRepo extends JpaRepository<Contact, UUID> {
}
