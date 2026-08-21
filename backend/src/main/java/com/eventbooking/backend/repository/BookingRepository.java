package com.eventbooking.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eventbooking.backend.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {
}