package com.redeemerlives.advanced_database_project.controller;

import com.redeemerlives.advanced_database_project.Booking;
import com.redeemerlives.advanced_database_project.entity.*;
import com.redeemerlives.advanced_database_project.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CreationController {

    private final LocationRepository locationRepository;

    private final BookingRepository bookingRepository;

    private final CourseFeeRepository courseFeeRepository;

    private final CourseTypeRepository courseTypeRepository;

    private final InvoiceRepository invoiceRepository;

    private final RegistrationRepository registrationRepository;

    private final PaymentMethodRepository paymentMethodRepository;

    @PostMapping("/createLocation")
    public ResponseEntity<Location> createLocation(@RequestBody Location location) {
        Location savedLocation = locationRepository.save(location);
        return ResponseEntity.ok(savedLocation);
    }

    @GetMapping("/createLocation")
    public ResponseEntity<List<Location>> getLocations() {
        return ResponseEntity.ok(locationRepository.findAll());
    }

    @PostMapping("/createBooking")
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        Booking savedBooking = bookingRepository.save(booking);
        return ResponseEntity.ok(savedBooking);
    }

    @PostMapping("/createCourseFee")
    public ResponseEntity<CourseFee> createCourseFee(@RequestBody CourseFee courseFee) {
        CourseFee savedCourseFee = courseFeeRepository.save(courseFee);
        return ResponseEntity.ok(savedCourseFee);
    }

    @GetMapping("/courseFee")
    public ResponseEntity<List<CourseFee>> getAllCourseFee() {
        return ResponseEntity.ok(courseFeeRepository.findAll());
    }

    @PostMapping("/createCourseType")
    public ResponseEntity<CourseType> createCourseType(@RequestBody CourseType courseType) {
        CourseType savedCourseType = courseTypeRepository.save(courseType);
        return ResponseEntity.ok(savedCourseType);
    }

    @GetMapping("/courseTypes")
    public ResponseEntity<List<CourseType>> getAllCourseType() {
        return ResponseEntity.ok(courseTypeRepository.findAll());
    }

    @PostMapping("/createInvoice")
    public ResponseEntity<Invoice> createInvoice(@RequestBody Invoice invoice) {
        Invoice savedInvoice = invoiceRepository.save(invoice);
        return ResponseEntity.ok(savedInvoice);
    }

    @PostMapping("/createRegistration")
    public ResponseEntity<Registration> createRegistration(@RequestBody Registration registration) {
        Registration savedRegistration = registrationRepository.save(registration);
        return ResponseEntity.ok(savedRegistration);
    }

    @PostMapping("/createPayment")
    public ResponseEntity<PaymentMethod> createPayment(@RequestBody PaymentMethod paymentMethod) {
        PaymentMethod paymentMethod1 = paymentMethodRepository.save(paymentMethod);
        return ResponseEntity.ok(paymentMethod1);
    }

    @GetMapping("/getPayment")
    public ResponseEntity<List<PaymentMethod>> getAllPayments() {
        return ResponseEntity.ok(paymentMethodRepository.findAll());
    }
}

