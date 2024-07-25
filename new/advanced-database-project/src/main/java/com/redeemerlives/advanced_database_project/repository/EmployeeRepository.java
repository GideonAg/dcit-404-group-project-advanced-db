package com.redeemerlives.advanced_database_project.repository;

import com.redeemerlives.advanced_database_project.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;

public interface EmployeeRepository extends JpaRepository<Employee, Long>, EmployeeRepositoryCustom {

    @Procedure(procedureName = "create_employee")
    void createEmployee(String firstName, String lastName, String position);

    @Procedure(procedureName = "delete_employee")
    void deleteEmployeeById(Long id);

}
