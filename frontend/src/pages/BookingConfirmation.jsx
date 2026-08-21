import React from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  CalendarDays,
  MapPin,
  Ticket,
  User,
  Mail,
  Phone,
  ArrowLeft,
  Download,
} from "lucide-react";
import "./BookingConfirmation.css";

export default function BookingConfirmation() {
  const navigate = useNavigate();

  const booking = JSON.parse(
    localStorage.getItem("eventBooking") || "null"
  );

  if (!booking) {
    return (
      <div className="confirmation-empty">
        <div className="empty-box">
          <div className="empty-icon">🎫</div>

          <h1>Booking Expired</h1>

          <p>
            Your booking information is no longer available.
            Please start your booking again.
          </p>

          <button
            onClick={() => navigate("/events")}
            className="back-events-btn"
          >
            <ArrowLeft size={18} />
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="confirmation-page">

      {/* HEADER */}
      <header className="confirmation-header">
        <div
          className="confirmation-logo"
          onClick={() => navigate("/")}
        >
          <span>🎫</span>
          EVENTBOOK
        </div>

        <button
          className="header-back"
          onClick={() => navigate("/events")}
        >
          <ArrowLeft size={17} />
          Back to Events
        </button>
      </header>

      {/* MAIN */}
      <main className="confirmation-container">

        {/* SUCCESS */}
        <section className="success-section">

          <div className="success-circle">
            <CheckCircle2 size={48} />
          </div>

          <p className="success-label">
            BOOKING CONFIRMED
          </p>

          <h1>
            You're all set, {booking.fullName}! 🎉
          </h1>

          <p className="success-text">
            Your seat has been successfully reserved.
            We've saved your booking details below.
          </p>

        </section>

        {/* TICKET CARD */}
        <section className="ticket-card">

          <div className="ticket-top">

            <div>
              <span className="ticket-category">
                {booking.category}
              </span>

              <h2>{booking.eventName}</h2>

              <p className="ticket-description">
                {booking.description}
              </p>
            </div>

            <div className="ticket-status">
              <CheckCircle2 size={20} />
              Confirmed
            </div>

          </div>

          <div className="ticket-line"></div>

          {/* EVENT DETAILS */}
          <div className="event-details">

            <div className="detail-item">
              <div className="detail-icon">
                <CalendarDays size={20} />
              </div>

              <div>
                <span>Date</span>
                <strong>{booking.date}</strong>
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-icon">
                <MapPin size={20} />
              </div>

              <div>
                <span>Location</span>
                <strong>{booking.location}</strong>
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-icon">
                <Ticket size={20} />
              </div>

              <div>
                <span>Tickets</span>
                <strong>{booking.tickets} Ticket(s)</strong>
              </div>
            </div>

          </div>

        </section>

        {/* BOOKING DETAILS */}
        <section className="details-card">

          <h2>Booking Details</h2>

          <div className="customer-grid">

            <div className="customer-item">
              <User size={19} />
              <div>
                <span>Full Name</span>
                <strong>{booking.fullName}</strong>
              </div>
            </div>

            <div className="customer-item">
              <Mail size={19} />
              <div>
                <span>Email Address</span>
                <strong>{booking.email}</strong>
              </div>
            </div>

            <div className="customer-item">
              <Phone size={19} />
              <div>
                <span>Phone Number</span>
                <strong>+91 {booking.phone}</strong>
              </div>
            </div>

          </div>

        </section>

        {/* PAYMENT */}
        <section className="amount-card">

          <div>
            <span>
              {booking.tickets} ticket
              {booking.tickets > 1 ? "s" : ""}
            </span>

            <strong>Total Amount</strong>
          </div>

          <div className="total-price">
            ₹{booking.totalAmount}
          </div>

        </section>

        {/* ACTIONS */}
        <div className="confirmation-actions">

          <button
            className="download-btn"
            onClick={() => window.print()}
          >
            <Download size={18} />
            Download / Print Ticket
          </button>

          <button
            className="events-btn"
            onClick={() => navigate("/events")}
          >
            Explore More Events
          </button>

        </div>

        <div className="secure-message">
          🔒 Your booking is securely protected
        </div>

      </main>

    </div>
  );
}