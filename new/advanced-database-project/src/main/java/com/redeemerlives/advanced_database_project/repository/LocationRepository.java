package com.redeemerlives.advanced_database_project.repository;

import com.redeemerlives.advanced_database_project.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository<Location, Long> {
}
