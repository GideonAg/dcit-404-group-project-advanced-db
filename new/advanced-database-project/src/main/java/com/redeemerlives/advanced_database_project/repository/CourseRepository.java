package com.redeemerlives.advanced_database_project.repository;

import com.redeemerlives.advanced_database_project.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long>, CourseRepositoryCustom {

    @Procedure(procedureName = "CreateCourse")
    void createCourse(String courseName, String courseDescription, LocalDate startDate, LocalTime startTime,
                      LocalDate endDate, LocalTime endTime, Integer maxDelegates, Boolean confirmed,
                      Long delivererEmployeeNo, Long courseTypeNo);

    @Procedure(procedureName = "DeleteCourse")
    void deleteCourse(Long courseNo);

}

