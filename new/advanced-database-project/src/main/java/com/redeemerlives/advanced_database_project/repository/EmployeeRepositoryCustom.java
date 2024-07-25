package com.redeemerlives.advanced_database_project.repository;

import com.redeemerlives.advanced_database_project.entity.Employee;

import java.util.List;

public interface EmployeeRepositoryCustom {
    List<Employee> getAllEmployees();
    Employee getEmployee(Long employeeNo);
    void updateEmployee(Long employeeNo, String firstName, String lastName, String position);
}
