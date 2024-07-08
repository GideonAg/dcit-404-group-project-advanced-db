package com.redeemerlives.advanced_database_project.repository;

import com.redeemerlives.advanced_database_project.entity.Registration;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegistrationRepository extends JpaRepository<Registration, Long> {
}
