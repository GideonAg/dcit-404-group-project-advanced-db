package com.redeemerlives.advanced_database_project.repository;

import com.redeemerlives.advanced_database_project.entity.Delegate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DelegateRepository extends JpaRepository<Delegate, Long> {
}
