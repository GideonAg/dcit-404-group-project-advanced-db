package com.redeemerlives.advanced_database_project.controller;

import com.redeemerlives.advanced_database_project.Booking;
import com.redeemerlives.advanced_database_project.entity.*;
import com.redeemerlives.advanced_database_project.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CreationController {

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private CourseFeeRepository courseFeeRepository;

    @Autowired
    private CourseTypeRepository courseTypeRepository;

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private RegistrationRepository registrationRepository;

    @Autowired
    private PaymentMethodRepository paymentMethodRepository;

    @PostMapping("/createLocation")
    public ResponseEntity<Location> createLocation(@RequestBody Location location) {
        Location savedLocation = locationRepository.save(location);
        return ResponseEntity.ok(savedLocation);
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
}

