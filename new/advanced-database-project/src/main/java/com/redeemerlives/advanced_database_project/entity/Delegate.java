package com.redeemerlives.advanced_database_project.entity;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "delegate")
@Data
public class Delegate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long delegateNo;

    @Column(length = 10)
    private String delegateTitle;

    @Column(nullable = false, length = 100)
    private String delegateFName;

    @Column(nullable = false, length = 100)
    private String delegateLName;

    @Column(length = 150)
    private String delegateStreet;

    @Column(length = 100)
    private String delegateCity;

    @Column(length = 100)
    private String delegateState;

    @Column(length = 10)
    private String delegateZipCode;

    @Column(length = 15)
    private String attTelNo;

    @Column(length = 15)
    private String attFaxNo;

    @Column(length = 100)
    private String attEmailAddress;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "clientNo")
    private Client client;

}

