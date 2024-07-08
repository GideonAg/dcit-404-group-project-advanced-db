package com.redeemerlives.advanced_database_project.repository;

import com.redeemerlives.advanced_database_project.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
}
