package com.redeemerlives.advanced_database_project.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "course")
@Data
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long courseNo;

    @Column(length = 255)
    private String courseName;

    @Column(length = 500)
    private String courseDescription;

    @Column
    private LocalDate startDate;

    @Column
    private LocalTime startTime;

    @Column
    private LocalDate endDate;

    @Column
    private LocalTime endTime;

    @Column
    private Integer maxDelegates;

    @Column
    private Boolean confirmed;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "delivererEmployeeNo")
    private Employee deliverer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "courseTypeNo")
    private CourseType courseType;
}
