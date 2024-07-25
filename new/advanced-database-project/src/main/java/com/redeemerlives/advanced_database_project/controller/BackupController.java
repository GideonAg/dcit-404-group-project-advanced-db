package com.redeemerlives.advanced_database_project.controller;

import com.redeemerlives.advanced_database_project.service.BackupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class BackupController {

    @Autowired
    private BackupService backupService;

    @PostMapping("/api/backup")
    public ResponseEntity<Void> backupDatabase() {
        try {
            backupService.backupDatabase();
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}
