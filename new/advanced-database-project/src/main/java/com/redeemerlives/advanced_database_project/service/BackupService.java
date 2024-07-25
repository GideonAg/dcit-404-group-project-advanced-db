package com.redeemerlives.advanced_database_project.service;

import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;

@Service
public class BackupService {

    public void backupDatabase() throws Exception {
        String command = String.format(
                "expdp %s/%s@%s DIRECTORY=backup_dir DUMPFILE=backup_%s.dmp FULL=Y",
                "SYSTEM", "Jesussaves1", "REDEEMER", System.currentTimeMillis()
        );

        ProcessBuilder processBuilder = new ProcessBuilder();
        processBuilder.command("sh", "-c", command);

        Process process = processBuilder.start();

        StringBuilder output = new StringBuilder();
        BufferedReader reader = new BufferedReader(
                new InputStreamReader(process.getInputStream())
        );

        String line;
        while ((line = reader.readLine()) != null) {
            output.append(line + "\n");
        }

        int exitVal = process.waitFor();
        if (exitVal == 0) {
            System.out.println("Success!");
            System.out.println(output);
        } else {
            throw new RuntimeException("Failed to execute backup command");
        }
    }
}
