package com.redeemerlives.advanced_database_project.entity;

import com.redeemerlives.advanced_database_project.Booking;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "location")
@Data
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long locationNo;

    @Column(length = 255)
    private String locationName;

    @Column
    private Integer maxSize;

    @OneToMany(mappedBy = "location", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Booking> bookings;
}

