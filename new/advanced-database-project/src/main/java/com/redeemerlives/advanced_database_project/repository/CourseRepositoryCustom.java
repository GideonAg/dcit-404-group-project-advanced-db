package com.redeemerlives.advanced_database_project.repository;

import com.redeemerlives.advanced_database_project.entity.Course;

public interface CourseRepositoryCustom {
    Course getCourseByIdUsingCursor(Long courseNo);
    void updateCourse(Course course);
}
