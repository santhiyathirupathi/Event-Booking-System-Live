
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";

import BookingPage from "./pages/Booking";
import VerifyOTPPage from "./pages/verifyOTP";

import "./App.css";

/* =========================================================
   EVENTS
========================================================= */

const events = [
  {
    id: 1,
    category: "MUSIC",
    name: "Live Music Festival",
    date: "25 August 2026",
    location: "Chennai, Tamil Nadu",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    category: "TECHNOLOGY",
    name: "Tech Innovation Summit",
    date: "30 August 2026",
    location: "Coimbatore, Tamil Nadu",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    category: "WORKSHOP",
    name: "Creative Design Workshop",
    date: "5 September 2026",
    location: "Bengaluru, Karnataka",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    category: "COMEDY",
    name: "Stand Up Comedy Night",
    date: "8 September 2026",
    location: "Madurai, Tamil Nadu",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1527224857830-43a7acc85260?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 5,
    category: "BUSINESS",
    name: "Startup Business Conference",
    date: "12 September 2026",
    location: "Chennai, Tamil Nadu",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    category: "FESTIVAL",
    name: "Food & Culture Festival",
    date: "18 September 2026",
    location: "Coimbatore, Tamil Nadu",
    price: 249,
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 7,
    category: "CONCERT",
    name: "Live Concert 2026",
    date: "25 September 2026",
    location: "Bengaluru, Karnataka",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 8,
    category: "TECH",
    name: "AI & Machine Learning Expo",
    date: "2 October 2026",
    location: "Bengaluru, Karnataka",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 9,
    category: "FITNESS",
    name: "Fitness & Wellness Expo",
    date: "5 October 2026",
    location: "Chennai, Tamil Nadu",
    price: 349,
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 10,
    category: "FASHION",
    name: "Fashion Show 2026",
    date: "10 October 2026",
    location: "Bengaluru, Karnataka",
    price: 749,
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 11,
    category: "GAMING",
    name: "Gaming Championship",
    date: "15 October 2026",
    location: "Coimbatore, Tamil Nadu",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 12,
    category: "LITERATURE",
    name: "Book & Literature Fest",
    date: "18 October 2026",
    location: "Madurai, Tamil Nadu",
    price: 199,
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 13,
    category: "STARTUP",
    name: "Startup Pitch Night",
    date: "22 October 2026",
    location: "Chennai, Tamil Nadu",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 14,
    category: "MUSIC",
    name: "Beach Music Festival",
    date: "25 October 2026",
    location: "Chennai, Tamil Nadu",
    price: 599,
    image:
      "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 15,
    category: "CORPORATE",
    name: "Corporate Leadership Summit",
    date: "30 October 2026",
    location: "Coimbatore, Tamil Nadu",
    price: 1199,
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 16,
    category: "ART",
    name: "Art & Painting Exhibition",
    date: "5 November 2026",
    location: "Madurai, Tamil Nadu",
    price: 249,
    image:
      "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 17,
    category: "FOOD",
    name: "Food Carnival 2026",
    date: "10 November 2026",
    location: "Bengaluru, Karnataka",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 18,
    category: "CELEBRATION",
    name: "New Year Celebration",
    date: "31 December 2026",
    location: "Chennai, Tamil Nadu",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1485872299829-c673f5194813?auto=format&fit=crop&w=900&q=80",
  },
];

/* =========================================================
   HOME
========================================================= */

function Home() {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("eventbookUser")) || null
      );
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const refreshUser = () => {
      try {
        setUser(
          JSON.parse(localStorage.getItem("eventbookUser")) || null
        );
      } catch {
        setUser(null);
      }
    };

    window.addEventListener("storage", refreshUser);
    window.addEventListener("eventbookUserUpdated", refreshUser);

    return () => {
      window.removeEventListener("storage", refreshUser);
      window.removeEventListener(
        "eventbookUserUpdated",
        refreshUser
      );
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("eventbookUser");
    setUser(null);
    navigate("/");
  };

  const bookEvent = (event) => {
    if (!user) {
      navigate("/login", {
        state: {
          message: "Please login before booking an event.",
        },
      });
      return;
    }

    navigate("/booking", {
      state: { event },
    });
  };

  return (
    <div className="app">
      <header className="navbar">
        <div
          className="logo"
          onClick={() => navigate("/")}
        >
          <span>🎫</span>
          <strong>EventBook</strong>
        </div>

        <nav>
          <a href="#home">Home</a>
          <a href="#events">Events</a>
          <a href="#about">About</a>

          {user && (
            <button
              className="my-bookings-nav"
              onClick={() => navigate("/my-bookings")}
            >
              🎟 My Bookings
            </button>
          )}

          {user?.role === "ADMIN" && (
            <button
              className="admin-nav"
              onClick={() => navigate("/admin")}
            >
              Admin Dashboard
            </button>
          )}

          {!user ? (
            <>
              <button
                className="login-nav"
                onClick={() => navigate("/login")}
              >
                Login
              </button>

              <button
                className="register-nav"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </>
          ) : (
            <button
              className="logout-nav"
              onClick={logout}
            >
              Logout
            </button>
          )}
        </nav>
      </header>

      <section className="hero" id="home">
        <div className="hero-content">
          <div className="hero-tag">
            ✨ YOUR NEXT EXPERIENCE STARTS HERE
          </div>

          <p className="welcome">
            WELCOME TO EVENTBOOK
          </p>

          <h1>
            Discover & Book
            <br />
            <span>Amazing Events</span>
          </h1>

          <p className="hero-text">
            Discover concerts, technology summits,
            workshops, comedy shows and unforgettable
            experiences happening around you.
          </p>

          <div className="hero-buttons">
            <a
              href="#events"
              className="primary-btn"
            >
              Explore Events →
            </a>

            {!user && (
              <button
                className="secondary-btn"
                onClick={() => navigate("/register")}
              >
                Create Account
              </button>
            )}
          </div>

          <div className="stats">
            <div>
              <strong>50+</strong>
              <span>Events</span>
            </div>

            <div>
              <strong>10K+</strong>
              <span>Happy Users</span>
            </div>

            <div>
              <strong>25+</strong>
              <span>Locations</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image-card">
            <img
              src="https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1000&q=85"
              alt="Event"
            />

            <div className="hero-image-overlay">
              <span>🎵 LIVE EXPERIENCE</span>
              <strong>Unforgettable Moments</strong>
              <small>Discover • Book • Enjoy</small>
            </div>
          </div>
        </div>
      </section>

      <section
        className="events-section"
        id="events"
      >
        <div className="section-heading">
          <p>DON'T MISS OUT</p>
          <h2>Upcoming Events</h2>
          <span>
            Find your next unforgettable experience.
          </span>
        </div>

        <div className="event-grid">
          {events.map((event) => (
            <div
              className="event-card"
              key={event.id}
            >
              <div className="event-image">
                <img
                  src={event.image}
                  alt={event.name}
                />

                <div className="image-overlay">
                  <span>{event.category}</span>
                </div>

                <div className="event-date-badge">
                  {event.date.split(" ")[0]}
                  <small>
                    {event.date
                      .split(" ")[1]
                      ?.substring(0, 3)}
                  </small>
                </div>
              </div>

              <div className="event-body">
                <h3>{event.name}</h3>

                <p className="event-info">
                  📅 {event.date}
                </p>

                <p className="event-info">
                  📍 {event.location}
                </p>

                <div className="event-bottom">
                  <div className="price-area">
                    <small>Starting from</small>
                    <strong>
                      ₹{event.price}
                    </strong>
                  </div>

                  <button
                    className="book-btn"
                    onClick={() =>
                      bookEvent(event)
                    }
                  >
                    Book Now →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        className="about-section"
        id="about"
      >
        <div className="section-heading">
          <p>WHY EVENTBOOK?</p>

          <h2>
            Everything You Need For Your Next Event
          </h2>

          <span>
            We make discovering and booking events
            simple, fast and secure.
          </span>
        </div>

        <div className="features">
          <div className="feature">
            <div>🎫</div>
            <h3>Easy Booking</h3>
            <p>
              Book your favourite events in just a few clicks.
            </p>
          </div>

          <div className="feature">
            <div>🔒</div>
            <h3>Secure</h3>
            <p>
              Your account and booking information stays protected.
            </p>
          </div>

          <div className="feature">
            <div>⚡</div>
            <h3>Fast & Simple</h3>
            <p>
              A smooth booking experience without unnecessary steps.
            </p>
          </div>

          <div className="feature">
            <div>📱</div>
            <h3>Anytime Access</h3>
            <p>
              Discover and book events from any device.
            </p>
          </div>
        </div>
      </section>

      <footer>
        <h3>🎫 EventBook</h3>
        <p>Discover. Book. Enjoy.</p>

        <div>
          <a href="#home">Home</a>
          <a href="#events">Events</a>
          <a href="#about">About</a>
        </div>

        <small>
          © 2026 EventBook. All rights reserved.
        </small>
      </footer>
    </div>
  );
}

/* =========================================================
   PAYMENT PAGE
   DEMO PAYMENT
========================================================= */

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();

  const bookingData = location.state || {};

  const eventName =
    bookingData.eventName ||
    bookingData.event?.name ||
    "Selected Event";

  const date =
    bookingData.date ||
    bookingData.eventDate ||
    bookingData.event?.date ||
    "Event Date";

  const locationName =
    bookingData.location ||
    bookingData.eventLocation ||
    bookingData.event?.location ||
    "Event Location";

  const tickets = Number(
    bookingData.tickets ||
      bookingData.quantity ||
      1
  );

  const unitPrice = Number(
    bookingData.event?.price ||
      bookingData.ticketPrice ||
      bookingData.price ||
      0
  );

  const total = Number(
    bookingData.total ||
      bookingData.totalAmount ||
      unitPrice * tickets ||
      0
  );

  const [method, setMethod] = useState("card");

  const [cardName, setCardName] =
    useState("");

  const [cardNumber, setCardNumber] =
    useState("");

  const [expiry, setExpiry] =
    useState("");

  const [cvv, setCvv] =
    useState("");

  const [upiId, setUpiId] =
    useState("");

  const [processing, setProcessing] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleCardNumber = (e) => {
    let value = e.target.value
      .replace(/\D/g, "")
      .slice(0, 16);

    value = value
      .replace(/(.{4})/g, "$1 ")
      .trim();

    setCardNumber(value);
    setError("");
  };

  const handleExpiry = (e) => {
    let value = e.target.value
      .replace(/\D/g, "")
      .slice(0, 4);

    if (value.length >= 3) {
      value =
        value.slice(0, 2) +
        "/" +
        value.slice(2);
    }

    setExpiry(value);
    setError("");
  };

  const handlePayment = (e) => {
    e.preventDefault();

    setError("");

    if (!bookingData.event && !bookingData.eventName) {
      setError(
        "Booking details are missing. Please start from the booking page."
      );
      return;
    }

    if (method === "card") {
      if (!cardName.trim()) {
        setError(
          "Please enter cardholder name."
        );
        return;
      }

      if (
        cardNumber.replace(/\s/g, "")
          .length !== 16
      ) {
        setError(
          "Please enter a valid 16-digit card number."
        );
        return;
      }

      if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        setError(
          "Please enter expiry date in MM/YY format."
        );
        return;
      }

      if (cvv.length !== 3) {
        setError(
          "Please enter a valid 3-digit CVV."
        );
        return;
      }
    }

    if (method === "upi") {
      if (!upiId.trim()) {
        setError(
          "Please enter your UPI ID."
        );
        return;
      }

      if (!upiId.includes("@")) {
        setError(
          "Please enter a valid UPI ID."
        );
        return;
      }
    }

    setProcessing(true);

    setTimeout(() => {
      const paymentMethod =
        method === "card"
          ? "CARD"
          : method === "upi"
          ? "UPI"
          : "GOOGLE PAY";

      navigate(
        "/booking-confirmation",
        {
          replace: true,
          state: {
            ...bookingData,

            eventName,
            date,
            location: locationName,
            tickets,
            total,

            paymentMethod,

            paymentStatus: "PAID",

            bookingStatus:
              "CONFIRMED",

            paidAt:
              new Date().toISOString(),
          },
        }
      );
    }, 1500);
  };

  return (
    <div className="payment-page">

      <header className="payment-navbar">

        <div
          className="payment-logo"
          onClick={() => navigate("/")}
        >
          🎫 EventBook
        </div>

        <div className="payment-secure-top">
          🔒 Secure Payment
        </div>

      </header>

      <div className="payment-title">

        <p>EVENTBOOK</p>

        <h1>
          Complete Payment
        </h1>

        <span>
          Choose your preferred payment method
          and complete your booking.
        </span>

      </div>

      <main className="payment-container">

        {/* BOOKING SUMMARY */}

        <section className="payment-summary-card">

          <div className="summary-top">

            <span>🎫</span>

            <div>
              <p>YOUR BOOKING</p>

              <h2>
                {eventName}
              </h2>
            </div>

          </div>

          <div className="summary-line">
            <span>📅 Date</span>
            <strong>{date}</strong>
          </div>

          <div className="summary-line">
            <span>📍 Location</span>
            <strong>
              {locationName}
            </strong>
          </div>

          <div className="summary-line">
            <span>🎟 Tickets</span>
            <strong>{tickets}</strong>
          </div>

          <div className="summary-total">

            <span>Total Amount</span>

            <strong>
              ₹
              {total.toLocaleString(
                "en-IN"
              )}
            </strong>

          </div>

          <div className="demo-note">
            💡 This is a demo payment.
            No real money will be deducted.
          </div>

        </section>

        {/* PAYMENT FORM */}

        <section className="payment-form-card">

          <div className="payment-form-heading">

            <div className="payment-card-icon">
              💳
            </div>

            <div>
              <h2>
                Select Payment Method
              </h2>

              <p>
                All payments are securely processed.
              </p>
            </div>

          </div>

          {/* METHODS */}

          <div className="payment-methods">

            <button
              type="button"
              className={
                method === "card"
                  ? "payment-method active"
                  : "payment-method"
              }
              onClick={() => {
                setMethod("card");
                setError("");
              }}
            >
              <span className="method-icon">
                💳
              </span>

              <span>
                <strong>Card</strong>
                <small>
                  Credit / Debit Card
                </small>
              </span>

              <b>
                {method === "card"
                  ? "✓"
                  : ""}
              </b>
            </button>

            <button
              type="button"
              className={
                method === "upi"
                  ? "payment-method active"
                  : "payment-method"
              }
              onClick={() => {
                setMethod("upi");
                setError("");
              }}
            >
              <span className="method-icon">
                📱
              </span>

              <span>
                <strong>UPI</strong>
                <small>
                  Pay using UPI ID
                </small>
              </span>

              <b>
                {method === "upi"
                  ? "✓"
                  : ""}
              </b>
            </button>

            <button
              type="button"
              className={
                method === "gpay"
                  ? "payment-method active"
                  : "payment-method"
              }
              onClick={() => {
                setMethod("gpay");
                setError("");
              }}
            >
              <span className="method-icon">
                🟢
              </span>

              <span>
                <strong>
                  Google Pay
                </strong>

                <small>
                  Pay with GPay
                </small>
              </span>

              <b>
                {method === "gpay"
                  ? "✓"
                  : ""}
              </b>
            </button>

          </div>

          <form
            onSubmit={handlePayment}
          >

            {/* CARD */}

            {method === "card" && (
              <div className="card-payment-form">

                <label>
                  Cardholder Name
                </label>

                <input
                  type="text"
                  placeholder="Enter cardholder name"
                  value={cardName}
                  onChange={(e) => {
                    setCardName(
                      e.target.value
                    );
                    setError("");
                  }}
                />

                <label>
                  Card Number
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="4111 1111 1111 1111"
                  value={cardNumber}
                  onChange={
                    handleCardNumber
                  }
                />

                <div className="payment-input-row">

                  <div>
                    <label>
                      Expiry Date
                    </label>

                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="MM/YY"
                      maxLength={5}
                      value={expiry}
                      onChange={
                        handleExpiry
                      }
                    />
                  </div>

                  <div>
                    <label>
                      CVV
                    </label>

                    <input
                      type="password"
                      inputMode="numeric"
                      placeholder="123"
                      maxLength={3}
                      value={cvv}
                      onChange={(e) =>
                        setCvv(
                          e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 3)
                        )
                      }
                    />
                  </div>

                </div>

                <div className="demo-card">

                  <strong>
                    🧪 Demo Card
                  </strong>

                  <span>
                    4111 1111 1111 1111
                  </span>

                  <small>
                    Any Name • 12/30 • 123
                  </small>

                </div>

              </div>
            )}

            {/* UPI */}

            {method === "upi" && (
              <div className="upi-payment-form">

                <div className="upi-big-icon">
                  📱
                </div>

                <h3>
                  Pay using UPI
                </h3>

                <p>
                  Enter any demo UPI ID to continue.
                </p>

                <label>
                  UPI ID
                </label>

                <input
                  type="text"
                  placeholder="gopi@upi"
                  value={upiId}
                  onChange={(e) => {
                    setUpiId(
                      e.target.value
                    );
                    setError("");
                  }}
                />

                <div className="demo-card">

                  <strong>
                    🧪 Demo UPI
                  </strong>

                  <span>
                    gopi@upi
                  </span>

                </div>

              </div>
            )}

            {/* GOOGLE PAY */}

            {method === "gpay" && (
              <div className="gpay-payment-form">

                <div className="gpay-logo">
                  G
                </div>

                <h3>
                  Google Pay
                </h3>

                <p>
                  This is a sample Google Pay
                  payment option for your project.
                </p>

                <div className="gpay-box">

                  <span>🟢</span>

                  <div>
                    <strong>
                      Google Pay Demo
                    </strong>

                    <small>
                      Click Pay below to simulate
                      successful payment.
                    </small>
                  </div>

                </div>

              </div>
            )}

            {/* ERROR */}

            {error && (
              <div className="payment-error">
                ⚠️ {error}
              </div>
            )}

            {/* PAY BUTTON */}

            <button
              type="submit"
              className="pay-now-btn"
              disabled={processing}
            >
              {processing ? (
                <>
                  <span className="payment-spinner"></span>
                  Processing Payment...
                </>
              ) : (
                <>
                  🔒 Pay ₹
                  {total.toLocaleString(
                    "en-IN"
                  )}
                </>
              )}
            </button>

          </form>

          <div className="payment-security">
            🔒 Secure & Encrypted Demo Payment
          </div>

          <button
            type="button"
            className="payment-back-btn"
            onClick={() => navigate(-1)}
          >
            ← Back to OTP
          </button>

        </section>

      </main>

      <footer className="payment-footer">
        © 2026 EventBook • Safe & Secure Event Booking
      </footer>

    </div>
  );
}

/* =========================================================
   MY BOOKINGS
========================================================= */

function MyBookings() {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("eventbookUser")) || null;
    } catch {
      return null;
    }
  });

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const refreshUser = () => {
      try {
        setUser(JSON.parse(localStorage.getItem("eventbookUser")) || null);
      } catch {
        setUser(null);
      }
    };

    const loadBookings = () => {
      try {
        const all = JSON.parse(localStorage.getItem("eventbookBookings")) || [];
        const currentUser = JSON.parse(localStorage.getItem("eventbookUser")) || null;
        setBookings(
          currentUser?.email
            ? all.filter((booking) => booking.email === currentUser.email)
            : []
        );
      } catch {
        setBookings([]);
      }
    };

    refreshUser();
    loadBookings();

    window.addEventListener("storage", refreshUser);
    window.addEventListener("eventbookUserUpdated", refreshUser);
    window.addEventListener("eventbookBookingUpdated", loadBookings);

    return () => {
      window.removeEventListener("storage", refreshUser);
      window.removeEventListener("eventbookUserUpdated", refreshUser);
      window.removeEventListener("eventbookBookingUpdated", loadBookings);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("eventbookUser");
    window.dispatchEvent(new Event("eventbookUserUpdated"));
    navigate("/");
  };

  if (!user) {
    return (
      <div className="bookings-page-modern">
        <header className="navbar bookings-navbar">
          <div className="logo" onClick={() => navigate("/")}>
            <span>🎫</span>
            <strong>EventBook</strong>
          </div>
          <nav>
            <a href="/#home">Home</a>
            <a href="/#events">Events</a>
            <a href="/#about">About</a>
            <button className="login-nav" onClick={() => navigate("/login")}>Login</button>
            <button className="register-nav" onClick={() => navigate("/register")}>Register</button>
          </nav>
        </header>

        <main className="my-bookings-shell">
          <section className="my-bookings-hero">
            <div className="eyebrow">EVENTBOOK</div>
            <h1>My Bookings</h1>
            <p>Keep all your event tickets, booking details and payment status in one place.</p>
          </section>

          <div className="booking-empty-card">
            <div className="booking-empty-icon">🔐</div>
            <span className="empty-kicker">ACCOUNT REQUIRED</span>
            <h2>Login to view your bookings</h2>
            <p>Your confirmed tickets will appear here after you sign in and complete a booking.</p>
            <button className="my-booking-primary" onClick={() => navigate("/login")}>Login Now <span>→</span></button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bookings-page-modern">
      <header className="navbar bookings-navbar">
        <div className="logo" onClick={() => navigate("/")}>
          <span>🎫</span>
          <strong>EventBook</strong>
        </div>

        <nav>
          <a href="/#home">Home</a>
          <a href="/#events">Events</a>
          <a href="/#about">About</a>
          <button className="my-bookings-nav active-nav" onClick={() => navigate("/my-bookings")}>🎟 My Bookings</button>
          {user.role === "ADMIN" && (
            <button className="admin-nav" onClick={() => navigate("/admin")}>Admin</button>
          )}
          <button className="logout-nav" onClick={logout}>Logout</button>
        </nav>
      </header>

      <main className="my-bookings-shell">
        <section className="my-bookings-hero">
          <div>
            <div className="eyebrow">EVENTBOOK • YOUR TICKETS</div>
            <h1>My Bookings</h1>
            <p>Track your confirmed events, ticket quantity and payment details — all in one clean dashboard.</p>
          </div>
          <button className="back-events-btn" onClick={() => navigate("/#events")}>Explore Events <span>→</span></button>
        </section>

        <div className="booking-summary-strip">
          <div><span>CONFIRMED BOOKINGS</span><strong>{bookings.length}</strong></div>
          <div><span>TICKETS RESERVED</span><strong>{bookings.reduce((sum, b) => sum + Number(b.tickets || 0), 0)}</strong></div>
          <div><span>TOTAL SPEND</span><strong>₹{bookings.reduce((sum, b) => sum + Number(b.total || 0), 0).toLocaleString("en-IN")}</strong></div>
        </div>

        {bookings.length === 0 ? (
          <div className="booking-empty-card">
            <div className="booking-empty-icon">🎟️</div>
            <span className="empty-kicker">NO BOOKINGS YET</span>
            <h2>Your event journey starts here</h2>
            <p>You haven't booked an event yet. Explore the latest events and reserve your favourite experience.</p>
            <button className="my-booking-primary" onClick={() => navigate("/#events")}>Explore Events <span>→</span></button>
          </div>
        ) : (
          <section className="my-bookings-list-modern">
            {bookings.map((booking, index) => (
              <article className="booking-history-card-modern" key={booking.id || index}>
                <div className="booking-card-accent" />

                <div className="booking-card-main">
                  <div className="booking-card-head">
                    <div className="booking-event-icon">🎫</div>
                    <div className="booking-event-title">
                      <span>BOOKING #{booking.id || index + 1}</span>
                      <h2>{booking.eventName || "Event Booking"}</h2>
                    </div>
                    <div className="confirmed-badge-modern">✓ CONFIRMED</div>
                  </div>

                  <div className="booking-info-grid-modern">
                    <div className="booking-info-modern">
                      <span>📅 DATE</span>
                      <strong>{booking.date || "Event Date"}</strong>
                    </div>
                    <div className="booking-info-modern">
                      <span>📍 LOCATION</span>
                      <strong>{booking.location || "Event Location"}</strong>
                    </div>
                    <div className="booking-info-modern">
                      <span>🎟 TICKETS</span>
                      <strong>{booking.tickets || 1} Ticket(s)</strong>
                    </div>
                    <div className="booking-info-modern">
                      <span>💳 PAYMENT</span>
                      <strong className="paid-text">✓ PAID</strong>
                    </div>
                  </div>

                  <div className="booking-card-footer-modern">
                    <div className="booking-success-modern">
                      <span>✓</span>
                      <div>
                        <strong>Ticket Confirmed Successfully</strong>
                        <small>{booking.paymentMethod || "Demo Payment"} • {booking.paymentStatus || "PAID"}</small>
                      </div>
                    </div>
                    <div className="booking-total-modern">
                      <span>TOTAL AMOUNT</span>
                      <strong>₹{Number(booking.total || 0).toLocaleString("en-IN")}</strong>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

/* =========================================================
   CONFIRMATION
========================================================= */

function Confirmation() {
  const navigate = useNavigate();
  const location = useLocation();

  const bookingData =
    location.state || {};

  const user =
    JSON.parse(
      localStorage.getItem(
        "eventbookUser"
      )
    ) || {};

  const eventName =
    bookingData.eventName ||
    bookingData.event?.name ||
    "Selected Event";

  const date =
    bookingData.date ||
    bookingData.event?.date ||
    "Event Date";

  const locationName =
    bookingData.location ||
    bookingData.event?.location ||
    "Event Location";

  const tickets = Number(
    bookingData.tickets ||
      bookingData.quantity ||
      1
  );

  const total = Number(
    bookingData.total ||
      bookingData.totalAmount ||
      bookingData.event?.price ||
      0
  );

  useEffect(() => {
    if (
      !bookingData.eventName &&
      !bookingData.event?.name
    ) {
      return;
    }

    const allBookings =
      JSON.parse(
        localStorage.getItem(
          "eventbookBookings"
        )
      ) || [];

    const newBooking = {
      id:
        "EB" +
        Date.now(),

      email:
        user.email ||
        bookingData.email ||
        "",

      name:
        user.name ||
        bookingData.name ||
        "",

      phone:
        bookingData.phone ||
        "",

      eventId:
        bookingData.eventId ||
        bookingData.event?.id ||
        "",

      eventName,

      date,

      location:
        locationName,

      tickets,

      total,

      paymentMethod:
        bookingData.paymentMethod ||
        "DEMO PAYMENT",

      paymentStatus:
        "PAID",

      bookingStatus:
        "CONFIRMED",

      bookingDate:
        new Date().toLocaleDateString(
          "en-IN"
        ),

      paidAt:
        bookingData.paidAt ||
        new Date().toISOString(),
    };

    const alreadyExists =
      allBookings.some(
        (booking) =>
          booking.email ===
            newBooking.email &&
          booking.eventName ===
            newBooking.eventName &&
          booking.date ===
            newBooking.date &&
          Number(booking.total) ===
            Number(newBooking.total)
      );

    if (!alreadyExists) {
      const updated = [
        ...allBookings,
        newBooking,
      ];

      localStorage.setItem(
        "eventbookBookings",
        JSON.stringify(updated)
      );

      window.dispatchEvent(
        new Event(
          "eventbookBookingUpdated"
        )
      );
    }
  }, []);

  return (
    <div className="confirmation-page">

      <div className="confirmation-card">

        <div className="success-icon">
          ✓
        </div>

        <p className="success-label">
          PAYMENT SUCCESSFUL
        </p>

        <h1>
          You're All Set!
        </h1>

        <p className="confirmation-text">
          Your payment and event booking
          have been successfully confirmed.
        </p>

        <div className="confirmation-details">

          <div>
            <span>Event</span>
            <strong>
              {eventName}
            </strong>
          </div>

          <div>
            <span>Date</span>
            <strong>
              {date}
            </strong>
          </div>

          <div>
            <span>Location</span>
            <strong>
              {locationName}
            </strong>
          </div>

          <div>
            <span>Tickets</span>
            <strong>
              {tickets}
            </strong>
          </div>

          <div>
            <span>Payment</span>
            <strong>
              ✓ PAID
            </strong>
          </div>

          <div>
            <span>Payment Method</span>
            <strong>
              {bookingData.paymentMethod ||
                "DEMO PAYMENT"}
            </strong>
          </div>

          <div className="confirmation-total">

            <span>
              Total Amount
            </span>

            <strong>
              ₹
              {total.toLocaleString(
                "en-IN"
              )}
            </strong>

          </div>

        </div>

        <div className="payment-success">
          ✓ Payment Successful
        </div>

        <button
          className="auth-btn"
          onClick={() =>
            navigate(
              "/my-bookings"
            )
          }
        >
          🎟 View My Booking
        </button>

        <button
          className="payment-back"
          onClick={() =>
            navigate("/")
          }
        >
          Explore More Events
        </button>

      </div>

    </div>
  );
}

/* =========================================================
   LOGIN
========================================================= */

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const login = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response =
        await fetch(
          "http://localhost:8080/api/auth/login",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              email,
              password,
            }),
          }
        );

      if (!response.ok) {
        const message =
          await response.text();

        setError(
          message ||
            "Invalid email or password."
        );

        return;
      }

      const user =
        await response.json();

      localStorage.setItem(
        "eventbookUser",
        JSON.stringify(user)
      );

      window.dispatchEvent(
        new Event(
          "eventbookUserUpdated"
        )
      );

      const fromBooking =
        location.state?.fromBooking;

      navigate(
        fromBooking
          ? "/booking"
          : "/"
      );
    } catch {
      setError(
        "Backend is not running. Start Spring Boot first."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-modern-page">

      <button
        className="auth-back"
        onClick={() =>
          navigate("/")
        }
      >
        ← Back to Home
      </button>

      <div className="auth-modern-card">

        <div className="auth-brand-panel">

          <div className="brand-big-logo">
            🎫
          </div>

          <h2>
            Event<span>Book</span>
          </h2>

          <p>
            Discover amazing events,
            create unforgettable memories.
          </p>

          <div className="brand-features">

            <div>
              <span>✓</span>
              Easy & Fast Booking
            </div>

            <div>
              <span>✓</span>
              Secure Payments
            </div>

            <div>
              <span>✓</span>
              Exclusive Events
            </div>

          </div>

        </div>

        <div className="auth-form-panel">

          <div className="auth-top-icon">
            🔐
          </div>

          <p className="auth-small-title">
            WELCOME BACK
          </p>

          <h1>
            Sign in to your account
          </h1>

          <p className="auth-subtitle">
            Enter your details to continue.
          </p>

          {location.state?.message && (
            <div className="auth-info-message">
              ℹ️ {location.state.message}
            </div>
          )}

          {error && (
            <div className="auth-error">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={login}>

            <div className="modern-field">

              <label>
                Email Address
              </label>

              <div className="modern-input-box">

                <span>✉️</span>

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  required
                />

              </div>

            </div>

            <div className="modern-field">

              <label>
                Password
              </label>

              <div className="modern-input-box">

                <span>🔒</span>

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  required
                />

              </div>

            </div>

            <button
              type="submit"
              className="modern-auth-btn"
              disabled={loading}
            >
              {loading
                ? "Signing in..."
                : "Sign In →"}
            </button>

          </form>

          <div className="auth-divider">
            <span>
              New to EventBook?
            </span>
          </div>

          <button
            className="outline-auth-btn"
            onClick={() =>
              navigate("/register")
            }
          >
            Create New Account
          </button>

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   REGISTER
========================================================= */

function Register() {
  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const register = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    if (password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );

      setLoading(false);
      return;
    }

    try {
      const response =
        await fetch(
          "http://localhost:8080/api/auth/register",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              name,
              email,
              password,
            }),
          }
        );

      if (!response.ok) {
        setError(
          (await response.text()) ||
            "Registration failed."
        );

        return;
      }

      alert(
        "Registration successful! Please login."
      );

      navigate("/login");
    } catch {
      setError(
        "Backend is not running. Start Spring Boot first."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-modern-page">

      <button
        className="auth-back"
        onClick={() =>
          navigate("/")
        }
      >
        ← Back to Home
      </button>

      <div className="auth-modern-card">

        <div className="auth-brand-panel">

          <div className="brand-big-logo">
            ✨
          </div>

          <h2>
            Join Event<span>Book</span>
          </h2>

          <p>
            Create your account and unlock
            amazing event experiences.
          </p>

          <div className="brand-features">

            <div>
              <span>✓</span>
              Easy Event Booking
            </div>

            <div>
              <span>✓</span>
              Secure Account
            </div>

            <div>
              <span>✓</span>
              Exclusive Events
            </div>

          </div>

        </div>

        <div className="auth-form-panel">

          <div className="auth-top-icon">
            🎟️
          </div>

          <p className="auth-small-title">
            GET STARTED
          </p>

          <h1>
            Create your account
          </h1>

          <p className="auth-subtitle">
            Join EventBook and discover amazing experiences.
          </p>

          {error && (
            <div className="auth-error">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={register}>

            <div className="modern-field">

              <label>
                Full Name
              </label>

              <div className="modern-input-box">

                <span>👤</span>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) =>
                    setName(
                      e.target.value
                    )
                  }
                  required
                />

              </div>

            </div>

            <div className="modern-field">

              <label>
                Email Address
              </label>

              <div className="modern-input-box">

                <span>✉️</span>

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  required
                />

              </div>

            </div>

            <div className="modern-field">

              <label>
                Password
              </label>

              <div className="modern-input-box">

                <span>🔒</span>

                <input
                  type="password"
                  placeholder="Minimum 6 characters"
                  minLength={6}
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  required
                />

              </div>

            </div>

            <button
              type="submit"
              className="modern-auth-btn"
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : "Create My Account →"}
            </button>

          </form>

          <div className="auth-divider">
            <span>
              Already have an account?
            </span>
          </div>

          <button
            className="outline-auth-btn"
            onClick={() =>
              navigate("/login")
            }
          >
            Sign In Instead
          </button>

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   ADMIN
========================================================= */

function AdminDashboard() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] =
    useState({
      totalUsers: 0,
      totalBookings: 0,
      totalEvents: 18,
      totalRevenue: 0,
    });

  const [users, setUsers] =
    useState([]);

  const [bookings, setBookings] =
    useState([]);

  const loadDashboard = async () => {
    try {
      const dash =
        await fetch(
          "http://localhost:8080/api/admin/dashboard"
        );

      if (dash.ok) {
        setDashboard(
          await dash.json()
        );
      }

      const userResponse =
        await fetch(
          "http://localhost:8080/api/admin/users"
        );

      if (userResponse.ok) {
        setUsers(
          await userResponse.json()
        );
      }

      const bookingResponse =
        await fetch(
          "http://localhost:8080/api/admin/bookings"
        );

      if (bookingResponse.ok) {
        setBookings(
          await bookingResponse.json()
        );
      }
    } catch {
      console.log(
        "Admin API unavailable"
      );
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <div className="admin-page">

      <header className="admin-header">

        <div className="logo">
          🎫 EventBook
          <span>Admin</span>
        </div>

        <div>

          <button
            onClick={loadDashboard}
            className="refresh-btn"
          >
            ↻ Refresh
          </button>

          <button
            onClick={() =>
              navigate("/")
            }
            className="logout-nav"
          >
            ← Website
          </button>

        </div>

      </header>

      <main className="admin-content">

        <p className="admin-label">
          ADMINISTRATION
        </p>

        <h1>
          Dashboard
        </h1>

        <p className="admin-welcome">
          Welcome back, Admin
        </p>

        <div className="dashboard-cards">

          <div className="dashboard-card">
            <span>👥</span>
            <small>Total Users</small>
            <strong>
              {dashboard.totalUsers}
            </strong>
          </div>

          <div className="dashboard-card">
            <span>🎫</span>
            <small>Total Bookings</small>
            <strong>
              {dashboard.totalBookings}
            </strong>
          </div>

          <div className="dashboard-card">
            <span>₹</span>
            <small>Total Revenue</small>
            <strong>
              ₹
              {dashboard.totalRevenue ||
                0}
            </strong>
          </div>

          <div className="dashboard-card">
            <span>📅</span>
            <small>Available Events</small>
            <strong>
              {dashboard.totalEvents}
            </strong>
          </div>

        </div>

        <section className="admin-table-section">

          <div className="table-heading">

            <div>
              <p>REGISTERED USERS</p>
              <h2>All Users</h2>
            </div>

            <span>
              {users.length} Users
            </span>

          </div>

          <div className="table-wrapper">

            <table>

              <thead>

                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>

              </thead>

              <tbody>

                {users.map(
                  (user) => (
                    <tr key={user.id}>

                      <td>
                        {user.id}
                      </td>

                      <td>
                        {user.name}
                      </td>

                      <td>
                        {user.email}
                      </td>

                      <td>
                        <span className="role-badge">
                          {user.role}
                        </span>
                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        </section>

        <section className="admin-table-section">

          <div className="table-heading">

            <div>
              <p>EVENT ACTIVITY</p>
              <h2>Recent Bookings</h2>
            </div>

            <span>
              {bookings.length} Bookings
            </span>

          </div>

          <div className="table-wrapper">

            <table>

              <thead>

                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Event</th>
                  <th>Tickets</th>
                  <th>Total</th>
                </tr>

              </thead>

              <tbody>

                {bookings.map(
                  (booking) => (
                    <tr key={booking.id}>

                      <td>
                        {booking.id}
                      </td>

                      <td>
                        {booking.name}
                      </td>

                      <td>
                        {booking.email}
                      </td>

                      <td>
                        {booking.eventName}
                      </td>

                      <td>
                        {booking.tickets}
                      </td>

                      <td>
                        ₹
                        {booking.total ||
                          0}
                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        </section>

      </main>

    </div>
  );
}

/* =========================================================
   APP
========================================================= */

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/booking"
          element={<BookingPage />}
        />

        <Route
          path="/verify-otp"
          element={<VerifyOTPPage />}
        />

        <Route
          path="/payment"
          element={<Payment />}
        />

        <Route
          path="/booking-confirmation"
          element={<Confirmation />}
        />

        <Route
          path="/confirmation"
          element={<Confirmation />}
        />

        <Route
          path="/my-bookings"
          element={<MyBookings />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

      </Routes>

    </BrowserRouter>
  );
}


export default App;
