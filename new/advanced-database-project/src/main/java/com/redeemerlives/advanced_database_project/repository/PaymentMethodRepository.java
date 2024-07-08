package com.redeemerlives.advanced_database_project.repository;

import com.redeemerlives.advanced_database_project.entity.PaymentMethod;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentMethodRepository extends JpaRepository<PaymentMethod, Long> {
}
