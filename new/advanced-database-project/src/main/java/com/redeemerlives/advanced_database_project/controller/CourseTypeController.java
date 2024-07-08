package com.redeemerlives.advanced_database_project.controller;

import com.redeemerlives.advanced_database_project.entity.CourseType;
import com.redeemerlives.advanced_database_project.repository.CourseTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/courseTypes")
public class CourseTypeController {

    @Autowired
    private CourseTypeRepository courseTypeRepository;

    @PostMapping
    public ResponseEntity<CourseType> createCourseType(@RequestBody CourseType courseType) {
        try {
            CourseType savedCourseType = courseTypeRepository.save(courseType);
            return ResponseEntity.ok(savedCourseType);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}

