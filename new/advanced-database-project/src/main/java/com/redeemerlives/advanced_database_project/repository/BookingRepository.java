package com.redeemerlives.advanced_database_project.repository;

import com.redeemerlives.advanced_database_project.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Long> {
}
