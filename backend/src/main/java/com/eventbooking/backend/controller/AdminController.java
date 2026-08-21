package com.eventbooking.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eventbooking.backend.entity.Booking;
import com.eventbooking.backend.entity.User;
import com.eventbooking.backend.repository.BookingRepository;
import com.eventbooking.backend.repository.UserRepository;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;

    public AdminController(
            UserRepository userRepository,
            BookingRepository bookingRepository) {

        this.userRepository = userRepository;
        this.bookingRepository = bookingRepository;
    }

    // =========================
    // GET ALL USERS
    // =========================
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {

        return ResponseEntity.ok(
                userRepository.findAll()
        );
    }

    // =========================
    // GET ALL BOOKINGS
    // =========================
    @GetMapping("/bookings")
    public ResponseEntity<List<Booking>> getAllBookings() {

        return ResponseEntity.ok(
                bookingRepository.findAll()
        );
    }

    // =========================
    // DASHBOARD SUMMARY
    // =========================
    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboard() {

        List<User> users = userRepository.findAll();
        List<Booking> bookings = bookingRepository.findAll();

        Map<String, Object> dashboard = new HashMap<>();

        // Total users
        dashboard.put("totalUsers", users.size());

        // Total bookings
        dashboard.put("totalBookings", bookings.size());

        // Total events
        // Your frontend currently has 20 events
        dashboard.put("totalEvents", 20);

        // =========================
        // TOTAL REVENUE
        // =========================
        double revenue = 0;

        for (Booking booking : bookings) {

            revenue += booking.getTotalAmount();
        }

        dashboard.put("totalRevenue", revenue);

        return ResponseEntity.ok(dashboard);
    }

    // =========================
    // ADMIN HEALTH CHECK
    // =========================
    @GetMapping("/status")
    public ResponseEntity<Map<String, String>> status() {

        Map<String, String> response = new HashMap<>();

        response.put("status", "success");

        response.put(
                "message",
                "Admin API is working"
        );

        return ResponseEntity.ok(response);
    }
}