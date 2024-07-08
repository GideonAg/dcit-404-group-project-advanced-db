package com.redeemerlives.advanced_database_project.repository;

import com.redeemerlives.advanced_database_project.entity.Course;
import jakarta.persistence.EntityManager;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.StoredProcedureQuery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

    @Procedure(name = "CreateCourse")
    void createCourse(String courseName, String courseDescription, LocalDate startDate, LocalTime startTime,
                      LocalDate endDate, LocalTime endTime, Integer maxDelegates, Boolean confirmed,
                      Long delivererEmployeeNo, Long courseTypeNo);

    @Procedure(name = "DeleteCourse")
    void deleteCourse(Long courseNo);

}

