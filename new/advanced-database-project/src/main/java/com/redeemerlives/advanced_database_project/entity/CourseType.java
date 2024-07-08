package com.redeemerlives.advanced_database_project.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "course_type")
@Data
public class CourseType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long courseTypeNo;

    @Column(length = 255)
    private String courseTypeDescription;

    @OneToMany(mappedBy = "courseType", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Course> courses;
}

