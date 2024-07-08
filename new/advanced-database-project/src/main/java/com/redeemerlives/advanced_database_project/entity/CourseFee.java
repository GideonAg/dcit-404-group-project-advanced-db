package com.redeemerlives.advanced_database_project.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Entity
@Table(name = "course_fee")
@Data
public class CourseFee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long courseFeeNo;

    @Column(length = 255)
    private String feeDescription;

    @Column
    private BigDecimal fee;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "courseNo")
    private Course course;
}

