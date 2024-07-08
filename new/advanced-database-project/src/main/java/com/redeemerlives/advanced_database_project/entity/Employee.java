package com.redeemerlives.advanced_database_project.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "employee")
@Data
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long employeeNo;

    @Column(length = 100)
    private String firstName;

    @Column(length = 100)
    private String lastName;

    @Column(length = 100)
    private String position;

    @OneToMany(mappedBy = "deliverer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Course> coursesDelivered;

    @OneToMany(mappedBy = "bookingEmployee", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Booking> bookings;

}

