package com.redeemerlives.advanced_database_project.controller;

import com.redeemerlives.advanced_database_project.entity.Course;
import com.redeemerlives.advanced_database_project.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseRepository courseRepository;

    @PostMapping
    public ResponseEntity<String> createCourse(@RequestBody Course course) {
        try {
            courseRepository.createCourse(
                    course.getCourseName(),
                    course.getCourseDescription(),
                    course.getStartDate(),
                    course.getStartTime(),
                    course.getEndDate(),
                    course.getEndTime(),
                    course.getMaxDelegates(),
                    course.getConfirmed(),
                    course.getDeliverer().getEmployeeNo(),
                    course.getCourseType().getCourseTypeNo()
            );
            return new ResponseEntity<>("Course created successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to create course: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCourseById(@PathVariable Long id) {
        return courseRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses() {
        return ResponseEntity.ok(courseRepository.findAll());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCourse(@PathVariable Long id) {
        try {
            courseRepository.deleteCourse(id);
            return new ResponseEntity<>("Course deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to delete course: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

