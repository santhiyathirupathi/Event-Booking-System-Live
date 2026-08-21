import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Minus,
  Plus,
  ShieldCheck,
  Ticket,
  User,
  Mail,
  Phone,
  Sparkles,
  LockKeyhole,
} from "lucide-react";

function Booking() {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedEvent = location.state?.event || null;

  const [tickets, setTickets] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const eventName =
    selectedEvent?.name || "Live Music Festival";

  const eventDate =
    selectedEvent?.date || "25 August 2026";

  const eventLocation =
    selectedEvent?.location || "Chennai, Tamil Nadu";

  const price =
    Number(selectedEvent?.price) || 499;

  const eventImage =
    selectedEvent?.image ||
    "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=85";

  const totalAmount = price * tickets;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const decreaseTickets = () => {
    setTickets((prev) => Math.max(1, prev - 1));
  };

  const increaseTickets = () => {
    setTickets((prev) => Math.min(10, prev + 1));
  };

  const handleContinue = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!formData.phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);

    const bookingData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      tickets,
      eventName,
      eventDate,
      eventLocation,
      price,
      totalAmount,
      event: selectedEvent,
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/otp/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: formData.phone.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || "Unable to generate OTP."
        );
        return;
      }

      // New OTP every time
      alert(`Demo OTP: ${data.otp}`);

      navigate("/verify-otp", {
        state: bookingData,
      });
    } catch (err) {
      console.error(err);

      setError(
        "Backend connection failed. Please start the backend."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-page">

      {/* BACK BUTTON */}
      <button
        className="booking-back"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={19} />
        Back to Events
      </button>

      <div className="booking-container">

        {/* LEFT EVENT PREVIEW */}
        <div className="booking-event-card">

          <div className="booking-image-wrap">
            <img
              src={eventImage}
              alt={eventName}
            />

            <div className="booking-image-overlay" />

            <div className="booking-event-badge">
              <Sparkles size={15} />
              EVENTBOOK
            </div>
          </div>

          <div className="booking-event-content">

            <p className="booking-small-title">
              YOUR SELECTED EVENT
            </p>

            <h1>{eventName}</h1>

            <div className="booking-event-info">
              <div>
                <CalendarDays size={18} />
                <span>{eventDate}</span>
              </div>

              <div>
                <MapPin size={18} />
                <span>{eventLocation}</span>
              </div>
            </div>

            <div className="booking-price-box">
              <div>
                <span>Ticket price</span>
                <strong>₹{price}</strong>
              </div>

              <div>
                <span>Available booking</span>
                <strong>Up to 10 tickets</strong>
              </div>
            </div>

            <div className="booking-secure-note">
              <ShieldCheck size={20} />

              <div>
                <strong>Secure booking</strong>
                <p>
                  Your booking details are protected
                  during the verification process.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT BOOKING FORM */}
        <div className="booking-form-card">

          <div className="booking-heading">

            <div className="booking-icon">
              <Ticket size={24} />
            </div>

            <div>
              <p>STEP 01</p>
              <h2>Book your tickets</h2>
            </div>

          </div>

          <p className="booking-description">
            Enter your details below to continue
            with your event booking.
          </p>

          <form onSubmit={handleContinue}>

            {/* NAME */}
            <div className="booking-field">

              <label>
                <User size={16} />
                Full Name
              </label>

              <div className="booking-input">
                <User size={19} />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </div>

            </div>

            {/* EMAIL */}
            <div className="booking-field">

              <label>
                <Mail size={16} />
                Email Address
              </label>

              <div className="booking-input">
                <Mail size={19} />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                />
              </div>

            </div>

            {/* PHONE */}
            <div className="booking-field">

              <label>
                <Phone size={16} />
                Phone Number
              </label>

              <div className="booking-input">

                <span className="country-code">
                  +91
                </span>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={10}
                  placeholder="10 digit mobile number"
                />

              </div>

              <small>
                A demo OTP will be generated for verification.
              </small>

            </div>

            {/* TICKETS */}
            <div className="booking-ticket-section">

              <div>
                <p className="ticket-title">
                  Number of Tickets
                </p>

                <p className="ticket-subtitle">
                  Choose how many tickets you need
                </p>
              </div>

              <div className="ticket-counter">

                <button
                  type="button"
                  onClick={decreaseTickets}
                >
                  <Minus size={18} />
                </button>

                <strong>{tickets}</strong>

                <button
                  type="button"
                  onClick={increaseTickets}
                >
                  <Plus size={18} />
                </button>

              </div>

            </div>

            {/* SUMMARY */}
            <div className="booking-summary">

              <div>
                <span>Ticket price</span>
                <strong>₹{price}</strong>
              </div>

              <div>
                <span>Quantity</span>
                <strong>× {tickets}</strong>
              </div>

              <div className="summary-total">
                <span>Total amount</span>
                <strong>₹{totalAmount}</strong>
              </div>

            </div>

            {error && (
              <div className="booking-error">
                {error}
              </div>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              className="booking-continue"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="booking-spinner" />
                  Generating OTP...
                </>
              ) : (
                <>
                  Continue to Verification
                  <ArrowLeft
                    size={19}
                    style={{
                      transform: "rotate(180deg)",
                    }}
                  />
                </>
              )}
            </button>

            <div className="booking-protection">

              <LockKeyhole size={15} />

              <span>
                Secure demo verification • Your details
                stay protected
              </span>

            </div>

          </form>

        </div>
      </div>

      {/* PAGE CSS */}
      <style>{`

        .booking-page {
          min-height: 100vh;
          padding: 45px 25px 70px;
          background:
            radial-gradient(
              circle at top left,
              rgba(99,102,241,.12),
              transparent 32%
            ),
            #f6f7fb;
          font-family:
            Inter, Arial, sans-serif;
          color: #172033;
        }

        .booking-back {
          display: flex;
          align-items: center;
          gap: 8px;
          border: none;
          background: transparent;
          color: #596579;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          max-width: 1180px;
          margin: 0 auto 25px;
        }

        .booking-back:hover {
          color: #4f46e5;
        }

        .booking-container {
          max-width: 1180px;
          margin: auto;
          display: grid;
          grid-template-columns:
            minmax(350px, .9fr)
            minmax(450px, 1.1fr);
          gap: 28px;
          align-items: start;
        }

        .booking-event-card,
        .booking-form-card {
          background: rgba(255,255,255,.96);
          border: 1px solid #e7eaf0;
          border-radius: 24px;
          box-shadow:
            0 20px 60px rgba(31,41,55,.08);
          overflow: hidden;
        }

        .booking-image-wrap {
          height: 280px;
          position: relative;
          overflow: hidden;
        }

        .booking-image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .booking-image-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              to bottom,
              rgba(0,0,0,.05),
              rgba(0,0,0,.55)
            );
        }

        .booking-event-badge {
          position: absolute;
          left: 22px;
          bottom: 20px;
          display: flex;
          align-items: center;
          gap: 7px;
          color: white;
          background: rgba(0,0,0,.38);
          backdrop-filter: blur(8px);
          padding: 9px 13px;
          border-radius: 30px;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .booking-event-content {
          padding: 28px;
        }

        .booking-small-title {
          margin: 0 0 9px;
          font-size: 11px;
          letter-spacing: 1.5px;
          color: #6366f1;
          font-weight: 800;
        }

        .booking-event-content h1 {
          margin: 0;
          font-size: 28px;
          line-height: 1.2;
        }

        .booking-event-info {
          margin-top: 22px;
          display: flex;
          flex-direction: column;
          gap: 13px;
          color: #5f6b7d;
          font-size: 14px;
        }

        .booking-event-info div {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .booking-event-info svg {
          color: #6366f1;
        }

        .booking-price-box {
          margin-top: 25px;
          padding: 16px;
          background: #f7f7ff;
          border-radius: 15px;
        }

        .booking-price-box div {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 7px 0;
        }

        .booking-price-box span {
          color: #727d8f;
          font-size: 13px;
        }

        .booking-price-box strong {
          font-size: 15px;
        }

        .booking-secure-note {
          margin-top: 20px;
          padding: 15px;
          border-radius: 14px;
          background: #f0fdf8;
          color: #16745a;
          display: flex;
          gap: 11px;
        }

        .booking-secure-note p {
          margin: 4px 0 0;
          font-size: 12px;
          line-height: 1.5;
          color: #4d806f;
        }

        .booking-form-card {
          padding: 34px;
        }

        .booking-heading {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .booking-icon {
          width: 50px;
          height: 50px;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #eef2ff;
          color: #4f46e5;
        }

        .booking-heading p {
          margin: 0 0 4px;
          color: #6366f1;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.2px;
        }

        .booking-heading h2 {
          margin: 0;
          font-size: 25px;
        }

        .booking-description {
          color: #748094;
          font-size: 14px;
          margin: 12px 0 27px;
        }

        .booking-field {
          margin-bottom: 19px;
        }

        .booking-field label {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 13px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .booking-field label svg {
          color: #6366f1;
        }

        .booking-input {
          height: 50px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 14px;
          border: 1px solid #dfe3eb;
          border-radius: 12px;
          background: #fff;
          transition: .2s;
        }

        .booking-input:focus-within {
          border-color: #6366f1;
          box-shadow:
            0 0 0 3px rgba(99,102,241,.10);
        }

        .booking-input svg {
          color: #98a2b3;
          flex-shrink: 0;
        }

        .booking-input input {
          border: none;
          outline: none;
          width: 100%;
          height: 100%;
          background: transparent;
          font-size: 14px;
          color: #172033;
        }

        .booking-input input::placeholder {
          color: #a0a8b6;
        }

        .country-code {
          padding-right: 10px;
          border-right: 1px solid #e1e5eb;
          font-weight: 700;
          font-size: 14px;
        }

        .booking-field small {
          display: block;
          margin-top: 7px;
          color: #8a94a5;
          font-size: 11px;
        }

        .booking-ticket-section {
          margin-top: 25px;
          padding: 18px;
          border-radius: 15px;
          background: #f8f9fc;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
        }

        .ticket-title {
          margin: 0;
          font-size: 14px;
          font-weight: 800;
        }

        .ticket-subtitle {
          margin: 5px 0 0;
          color: #8a94a5;
          font-size: 11px;
        }

        .ticket-counter {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .ticket-counter button {
          width: 34px;
          height: 34px;
          border: 1px solid #dce1e9;
          border-radius: 9px;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #4f46e5;
        }

        .ticket-counter button:hover {
          background: #eef2ff;
        }

        .ticket-counter strong {
          min-width: 20px;
          text-align: center;
        }

        .booking-summary {
          margin-top: 20px;
          padding: 18px;
          border: 1px solid #e8ebf1;
          border-radius: 15px;
        }

        .booking-summary div {
          display: flex;
          justify-content: space-between;
          padding: 5px 0;
          font-size: 13px;
          color: #707b8d;
        }

        .booking-summary strong {
          color: #172033;
        }

        .booking-summary .summary-total {
          margin-top: 10px;
          padding-top: 13px;
          border-top: 1px solid #e8ebf1;
          color: #172033;
          font-size: 15px;
        }

        .summary-total strong {
          font-size: 21px;
          color: #4f46e5;
        }

        .booking-error {
          margin-top: 15px;
          padding: 12px 14px;
          border-radius: 10px;
          background: #fff0f0;
          border: 1px solid #ffd5d5;
          color: #c53030;
          font-size: 13px;
        }

        .booking-continue {
          width: 100%;
          margin-top: 20px;
          height: 53px;
          border: none;
          border-radius: 13px;
          background: linear-gradient(
            135deg,
            #6366f1,
            #4f46e5
          );
          color: white;
          font-size: 14px;
          font-weight: 800;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          box-shadow:
            0 10px 25px rgba(79,70,229,.22);
        }

        .booking-continue:hover {
          transform: translateY(-1px);
        }

        .booking-continue:disabled {
          opacity: .65;
          cursor: not-allowed;
        }

        .booking-spinner {
          width: 17px;
          height: 17px;
          border: 2px solid rgba(255,255,255,.4);
          border-top-color: white;
          border-radius: 50%;
          animation: bookingSpin .7s linear infinite;
        }

        @keyframes bookingSpin {
          to {
            transform: rotate(360deg);
          }
        }

        .booking-protection {
          margin-top: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          color: #8993a3;
          font-size: 11px;
          text-align: center;
        }

        @media (max-width: 850px) {
          .booking-container {
            grid-template-columns: 1fr;
          }

          .booking-image-wrap {
            height: 240px;
          }
        }

        @media (max-width: 520px) {
          .booking-page {
            padding: 25px 14px 45px;
          }

          .booking-form-card,
          .booking-event-content {
            padding: 22px;
          }

          .booking-event-content h1 {
            font-size: 23px;
          }

          .booking-heading h2 {
            font-size: 21px;
          }

          .booking-ticket-section {
            align-items: flex-start;
            flex-direction: column;
          }

          .ticket-counter {
            width: 100%;
            justify-content: space-between;
          }
        }

      `}</style>
    </div>
  );
}

export default Booking;