package com.redeemerlives.advanced_database_project.repository;

import com.redeemerlives.advanced_database_project.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
