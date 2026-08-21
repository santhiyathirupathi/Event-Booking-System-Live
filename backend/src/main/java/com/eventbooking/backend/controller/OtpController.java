package com.eventbooking.backend.controller;

import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/otp")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
public class OtpController {

    private final Map<String, String> otpStore =
            new ConcurrentHashMap<>();

    @PostMapping("/send")
    public ResponseEntity<?> sendOtp(
            @RequestBody Map<String, String> request) {

        String phone = request.get("phone");

        // Validate phone
        if (phone == null ||
                !phone.matches("[6-9]\\d{9}")) {

            return ResponseEntity.badRequest()
                    .body(Map.of(
                            "message",
                            "Enter valid 10 digit phone number"
                    ));
        }

        // Generate NEW 6 digit OTP every time
        String otp = String.format(
                "%06d",
                new Random().nextInt(1_000_000)
        );

        // Save OTP for this phone
        otpStore.put(phone, otp);

        // Console display for demo
        System.out.println();
        System.out.println("================================");
        System.out.println("        EVENTBOOK DEMO OTP");
        System.out.println("================================");
        System.out.println("Phone : " + phone);
        System.out.println("OTP   : " + otp);
        System.out.println("================================");
        System.out.println();

        // Send OTP to frontend for demo purpose
        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Demo OTP generated successfully",
                        "otp",
                        otp
                )
        );
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyOtp(
            @RequestBody Map<String, String> request) {

        String phone = request.get("phone");
        String otp = request.get("otp");

        if (phone == null || otp == null) {

            return ResponseEntity.badRequest()
                    .body(Map.of(
                            "message",
                            "Phone and OTP are required",
                            "verified",
                            false
                    ));
        }

        // Get saved OTP
        String savedOtp = otpStore.get(phone);

        if (savedOtp == null) {

            return ResponseEntity.badRequest()
                    .body(Map.of(
                            "message",
                            "OTP expired or not found",
                            "verified",
                            false
                    ));
        }

        // Check OTP
        if (!savedOtp.equals(otp)) {

            return ResponseEntity.badRequest()
                    .body(Map.of(
                            "message",
                            "Invalid OTP",
                            "verified",
                            false
                    ));
        }

        // OTP can be used only once
        otpStore.remove(phone);

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "OTP verified successfully",
                        "verified",
                        true
                )
        );
    }
}