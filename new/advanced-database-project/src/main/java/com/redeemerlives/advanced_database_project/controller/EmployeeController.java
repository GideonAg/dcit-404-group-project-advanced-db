package com.redeemerlives.advanced_database_project.controller;

import com.redeemerlives.advanced_database_project.entity.Employee;
import com.redeemerlives.advanced_database_project.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @PostMapping
    public ResponseEntity<Void> createEmployee(@RequestBody Employee employee) {

        employeeRepository.createEmployee(employee.getFirstName(), employee.getLastName(), employee.getPosition());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees() {
        return ResponseEntity.ok(employeeRepository.getAllEmployees());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployee(@PathVariable Long id) {
        return ResponseEntity.ok(employeeRepository.getEmployee(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateEmployee(@PathVariable Long id, @RequestBody Employee employee) {
        employeeRepository.updateEmployee(id, employee.getFirstName(), employee.getLastName(), employee.getPosition());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployeeById(@PathVariable Long id) {
        employeeRepository.deleteEmployeeById(id);
        return ResponseEntity.accepted().build();
    }
}
