import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Ticket,
  User,
  Mail,
  Phone,
  CheckCircle2,
  CreditCard,
  ShieldCheck,
} from "lucide-react";
import "./MyBooking.css";

function MyBooking() {
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const savedBooking = localStorage.getItem("eventbook_booking");

    if (savedBooking) {
      try {
        setBooking(JSON.parse(savedBooking));
      } catch {
        setBooking(null);
      }
    }
  }, []);

  return (
    <div className="mybooking-page">

      {/* NAVBAR */}
      <header className="mybooking-navbar">

        <div
          className="mybooking-brand"
          onClick={() => navigate("/")}
        >
          <span className="brand-ticket">🎫</span>
          <span>
            EVENT<span>BOOK</span>
          </span>
        </div>

        <button
          className="mybooking-home-btn"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={17} />
          Home
        </button>

      </header>

      {/* PAGE HEADING */}
      <section className="mybooking-heading">

        <div className="mybooking-badge">
          <Ticket size={15} />
          My Booking
        </div>

        <h1>My Bookings</h1>

        <p>
          Track your event booking and payment status.
        </p>

      </section>

      {/* MAIN */}
      <main className="mybooking-container">

        {!booking ? (

          /* NO BOOKING */
          <div className="no-booking-card">

            <div className="no-booking-icon">
              <Ticket size={42} />
            </div>

            <h2>No Bookings Yet</h2>

            <p>
              You haven't booked any events yet.
              Explore our events and reserve your seat.
            </p>

            <button
              className="explore-btn"
              onClick={() => navigate("/")}
            >
              Explore Events →
            </button>

          </div>

        ) : (

          /* CONFIRMED BOOKING */
          <div className="booking-success-card">

            {/* CONFIRMED HEADER */}
            <div className="booking-status">

              <div className="status-left">

                <div className="status-check">
                  <CheckCircle2 size={22} />
                </div>

                <div>
                  <strong>Booking Confirmed</strong>

                  <span>
                    Your event ticket has been successfully booked
                  </span>
                </div>

              </div>

              <div className="confirmed-pill">
                ✓ CONFIRMED
              </div>

            </div>

            {/* EVENT CARD */}
            <div className="my-event-card">

              <div className="my-event-image">

                <div className="event-image-overlay"></div>

                <div className="event-image-content">

                  <span>EVENTBOOK</span>

                  <h2>
                    {booking.eventName ||
                      "Startup Business Conference"}
                  </h2>

                  <p>
                    Your unforgettable experience starts here.
                  </p>

                </div>

              </div>

              <div className="my-event-details">

                <div className="event-detail">

                  <div className="detail-icon">
                    <CalendarDays size={19} />
                  </div>

                  <div>
                    <span>Date</span>

                    <strong>
                      {booking.eventDate ||
                        "12 September 2026"}
                    </strong>
                  </div>

                </div>

                <div className="event-detail">

                  <div className="detail-icon">
                    <MapPin size={19} />
                  </div>

                  <div>
                    <span>Location</span>

                    <strong>
                      {booking.location ||
                        "Chennai, Tamil Nadu"}
                    </strong>
                  </div>

                </div>

                <div className="event-detail">

                  <div className="detail-icon">
                    <Ticket size={19} />
                  </div>

                  <div>
                    <span>Tickets</span>

                    <strong>
                      {booking.tickets || 1}{" "}
                      {Number(booking.tickets) === 1
                        ? "Ticket"
                        : "Tickets"}
                    </strong>
                  </div>

                </div>

              </div>

            </div>

            {/* BOOKING DETAILS */}
            <div className="customer-section">

              <h3>Booking Details</h3>

              <div className="customer-grid">

                <div className="customer-item">

                  <User size={18} />

                  <div>
                    <span>Full Name</span>

                    <strong>
                      {booking.name || "Guest User"}
                    </strong>
                  </div>

                </div>

                <div className="customer-item">

                  <Mail size={18} />

                  <div>
                    <span>Email Address</span>

                    <strong>
                      {booking.email || "Not available"}
                    </strong>
                  </div>

                </div>

                <div className="customer-item">

                  <Phone size={18} />

                  <div>
                    <span>Phone Number</span>

                    <strong>
                      +91 {booking.phone || "Not available"}
                    </strong>
                  </div>

                </div>

                <div className="customer-item">

                  <CreditCard size={18} />

                  <div>
                    <span>Payment Status</span>

                    <strong className="paid">
                      {booking.paymentStatus || "PAID"}
                    </strong>
                  </div>

                </div>

              </div>

            </div>

            {/* TOTAL */}
            <div className="booking-total">

              <div>
                <span>Total Amount</span>

                <small>
                  {booking.tickets || 1}{" "}
                  {Number(booking.tickets) === 1
                    ? "ticket"
                    : "tickets"}
                </small>
              </div>

              <strong>
                ₹
                {Number(
                  booking.total || 999
                ).toLocaleString("en-IN")}
              </strong>

            </div>

            {/* SECURE */}
            <div className="booking-secure">

              <div className="secure-icon">
                <ShieldCheck size={20} />
              </div>

              <div>
                <strong>
                  Booking Verified & Secure
                </strong>

                <span>
                  Your booking information is securely stored.
                </span>
              </div>

            </div>

            {/* BACK BUTTON */}
            <button
              className="browse-events-btn"
              onClick={() => navigate("/")}
            >
              Browse More Events
            </button>

          </div>

        )}

      </main>

      {/* FOOTER */}
      <footer className="mybooking-footer">
        © 2026 EventBook • Safe & Secure Event Booking
      </footer>

    </div>
  );
}

export default MyBooking;