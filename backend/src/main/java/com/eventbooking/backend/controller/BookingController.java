package com.eventbooking.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eventbooking.backend.entity.Booking;
import com.eventbooking.backend.repository.BookingRepository;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

    private final BookingRepository bookingRepository;

    public BookingController(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    // =========================
    // CREATE BOOKING
    // =========================
    @PostMapping
    public ResponseEntity<?> createBooking(
            @RequestBody Booking booking) {

        // -------------------------
        // VALIDATION
        // -------------------------

        if (booking.getName() == null ||
                booking.getName().trim().isEmpty()) {

            return ResponseEntity.badRequest()
                    .body("Name is required");
        }

        if (booking.getEmail() == null ||
                booking.getEmail().trim().isEmpty()) {

            return ResponseEntity.badRequest()
                    .body("Email is required");
        }

        if (booking.getEventName() == null ||
                booking.getEventName().trim().isEmpty()) {

            return ResponseEntity.badRequest()
                    .body("Event name is required");
        }

        if (booking.getTickets() <= 0) {

            return ResponseEntity.badRequest()
                    .body("Tickets must be at least 1");
        }

        // -------------------------
        // GET EVENT PRICE
        // -------------------------

        double eventPrice =
                getEventPrice(booking.getEventName());

        // -------------------------
        // CALCULATE TOTAL
        // -------------------------

        double totalAmount =
                eventPrice * booking.getTickets();

        booking.setTotalAmount(totalAmount);

        // -------------------------
        // BOOKING STATUS
        // -------------------------

        booking.setStatus("CONFIRMED");

        // -------------------------
        // SAVE BOOKING
        // -------------------------

        Booking savedBooking =
                bookingRepository.save(booking);

        return ResponseEntity.ok(savedBooking);
    }

    // =========================
    // EVENT PRICE
    // =========================

    private double getEventPrice(String eventName) {

        if (eventName == null) {
            return 0;
        }

        String event =
                eventName.trim().toLowerCase();

        switch (event) {

            case "live music festival":
                return 499;

            case "tech innovation summit":
                return 799;

            case "startup networking night":
                return 699;

            case "business networking night":
                return 599;

            default:
                /*
                 * If a new event is added and its price
                 * is not listed above, frontend totalAmount
                 * can still be used if it is greater than 0.
                 */
                return 0;
        }
    }

    // =========================
    // GET ALL BOOKINGS
    // =========================

    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {

        return ResponseEntity.ok(
                bookingRepository.findAll()
        );
    }

    // =========================
    // GET BOOKING BY ID
    // =========================

    @GetMapping("/{id}")
    public ResponseEntity<?> getBookingById(
            @PathVariable Long id) {

        return bookingRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(
                        ResponseEntity.notFound().build()
                );
    }
}