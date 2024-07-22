package com.redeemerlives.advanced_database_project.controller;

import com.redeemerlives.advanced_database_project.entity.Delegate;
import com.redeemerlives.advanced_database_project.repository.DelegateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/delegates")
@RequiredArgsConstructor
@CrossOrigin
public class DelegateController {

    private final DelegateRepository delegateRepository;

    @PostMapping
    public ResponseEntity<Delegate> createDelegate(@RequestBody Delegate delegate) {
        return ResponseEntity.status(201).body(delegateRepository.save(delegate));
    }

    @GetMapping
    public ResponseEntity<List<Delegate>> getAllDelegates() {
        return ResponseEntity.ok(delegateRepository.findAll());
    }
}
