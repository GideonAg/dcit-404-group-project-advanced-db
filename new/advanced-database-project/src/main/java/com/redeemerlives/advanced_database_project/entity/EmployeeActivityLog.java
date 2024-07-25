package com.redeemerlives.advanced_database_project.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "employee_activity_log")
public class EmployeeActivityLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String operationType;
    private Integer employeeNo;
    private String firstName;
    private String lastName;
    private String position;
    private LocalDateTime operationTimestamp = LocalDateTime.now();
    private String performedBy;
}
