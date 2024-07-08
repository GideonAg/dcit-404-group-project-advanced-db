package com.redeemerlives.advanced_database_project.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "registration")
@Data
public class Registration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long registrationNo;

    @Column
    private LocalDate registrationDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "delegateNo")
    private Delegate delegate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "courseFeeNo")
    private CourseFee courseFee;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "registerEmployeeNo")
    private Employee registerEmployee;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "courseNo")
    private Course course;
}

