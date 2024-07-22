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
@CrossOrigin
public class CourseController {

    private final CourseRepository courseRepository;

    @PostMapping
    public ResponseEntity<String> createCourse(@RequestBody Course course) {
        try {
//            courseRepository.createCourse(
//                    course.getCourseName(),
//                    course.getCourseDescription(),
//                    course.getStartDate(),
//                    course.getStartTime(),
//                    course.getEndDate(),
//                    course.getEndTime(),
//                    course.getMaxDelegates(),
//                    course.getConfirmed(),
//                    course.getDeliverer().getEmployeeNo(),
//                    course.getCourseType().getCourseTypeNo()
//            );
            courseRepository.save(course);
            return new ResponseEntity<>("Course created successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to create course: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseByIdUsingCursor(@PathVariable Long id) {
        return ResponseEntity.ok(courseRepository.findById(id).get());
//        return ResponseEntity.ok(courseRepository.getCourseByIdUsingCursor(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateCourse(@PathVariable Long id, @RequestBody Course course) {
        course.setCourseNo(id);
        courseRepository.updateCourse(course);
        return ResponseEntity.ok("Course updated successfully");
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

