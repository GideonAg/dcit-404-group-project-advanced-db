package com.redeemerlives.advanced_database_project.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "invoice")
@Data
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long invoiceNo;

    @Column
    private LocalDate dateRaised;

    @Column
    private LocalDate datePaid;

    @Column(length = 16)
    private String creditCardNo;

    @Column(length = 100)
    private String holdersName;

    @Column(length = 5)
    private String expiryDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "registrationNo")
    private Registration registration;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pMethodNo")
    private PaymentMethod paymentMethod;
}
