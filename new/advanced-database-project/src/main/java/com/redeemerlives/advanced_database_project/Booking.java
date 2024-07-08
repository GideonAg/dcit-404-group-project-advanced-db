package com.redeemerlives.advanced_database_project;

import com.redeemerlives.advanced_database_project.entity.Course;
import com.redeemerlives.advanced_database_project.entity.Employee;
import com.redeemerlives.advanced_database_project.entity.Location;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "booking")
@Data
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingNo;

    @Column
    private LocalDate bookingDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "locationNo")
    private Location location;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "courseNo")
    private Course course;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bookingEmployeeNo")
    private Employee bookingEmployee;
}

