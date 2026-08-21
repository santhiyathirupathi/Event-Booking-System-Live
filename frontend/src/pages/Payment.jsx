import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CreditCard,
  Smartphone,
  CheckCircle2,
  ShieldCheck,
  LockKeyhole,
  WalletCards,
} from "lucide-react";

import "./Payment.css";

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
    "12 September 2026";

  const eventLocation =
    bookingData.location ||
    bookingData.eventLocation ||
    bookingData.event?.location ||
    "Chennai, Tamil Nadu";

  const tickets = Number(
    bookingData.tickets ||
      bookingData.quantity ||
      1
  );

  const total = Number(
    bookingData.total ||
      bookingData.totalAmount ||
      bookingData.event?.price ||
      999
  );

  const [method, setMethod] = useState("card");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");

  const formatCardNumber = (value) => {
    const numbers = value
      .replace(/\D/g, "")
      .slice(0, 16);

    return numbers.replace(
      /(.{4})/g,
      "$1 "
    ).trim();
  };

  const handlePayment = (e) => {
    e.preventDefault();

    if (method === "card") {
      if (
        !cardName.trim() ||
        cardNumber.replace(/\s/g, "").length !== 16 ||
        !expiry.trim() ||
        cvv.length !== 3
      ) {
        alert(
          "Please enter valid demo card details."
        );
        return;
      }
    }

    if (
      (method === "upi" ||
        method === "gpay") &&
      !upiId.trim()
    ) {
      alert("Please enter your UPI ID.");
      return;
    }

    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);

      setTimeout(() => {
        navigate(
          "/booking-confirmation",
          {
            replace: true,
            state: {
              ...bookingData,

              eventName,
              date,
              location: eventLocation,

              tickets,
              total,

              paymentStatus: "PAID",
              bookingStatus: "CONFIRMED",
              paymentMethod: method,
            },
          }
        );
      }, 1200);
    }, 1800);
  };

  const useDemoCard = () => {
    setMethod("card");
    setCardName("Demo User");
    setCardNumber(
      "4111 1111 1111 1111"
    );
    setExpiry("12/30");
    setCvv("123");
  };

  if (success) {
    return (
      <div className="payment-page">

        <div className="payment-success-card">

          <div className="success-circle">
            <CheckCircle2 size={52} />
          </div>

          <p className="success-small">
            EVENTBOOK
          </p>

          <h1>
            Payment Successful!
          </h1>

          <p>
            Your payment has been
            successfully processed.
          </p>

          <div className="success-amount">
            ₹{total.toLocaleString("en-IN")}
          </div>

          <div className="success-status">
            <CheckCircle2 size={18} />
            Payment Confirmed
          </div>

          <div className="success-loader">
            Redirecting to booking confirmation...
          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="payment-page">

      {/* HEADER */}

      <header className="payment-navbar">

        <div
          className="payment-logo"
          onClick={() => navigate("/")}
        >
          <span>🎫</span>

          <strong>
            Event<span>Book</span>
          </strong>
        </div>

        <div className="secure-header">
          <LockKeyhole size={17} />
          Secure Payment
        </div>

      </header>

      {/* TITLE */}

      <section className="payment-heading">

        <p>EVENTBOOK</p>

        <h1>
          Complete Payment
        </h1>

        <span>
          Choose your preferred payment
          method and complete your booking.
        </span>

      </section>

      {/* MAIN */}

      <main className="payment-container">

        {/* LEFT */}

        <section className="payment-booking-card">

          <div className="payment-booking-top">

            <div className="booking-ticket-icon">
              🎫
            </div>

            <div>
              <p>YOUR BOOKING</p>

              <h2>
                {eventName}
              </h2>
            </div>

          </div>

          <div className="booking-info">

            <div>
              <span>📅 Date</span>
              <strong>{date}</strong>
            </div>

            <div>
              <span>📍 Location</span>
              <strong>
                {eventLocation}
              </strong>
            </div>

            <div>
              <span>🎟 Tickets</span>
              <strong>{tickets}</strong>
            </div>

          </div>

          <div className="booking-total">

            <span>
              Total Amount
            </span>

            <strong>
              ₹{total.toLocaleString("en-IN")}
            </strong>

          </div>

          <div className="demo-notice">
            💡
            <span>
              This is a demo payment.
              No real money will be deducted.
            </span>
          </div>

        </section>

        {/* RIGHT */}

        <section className="payment-method-card">

          <div className="payment-method-title">

            <div className="method-title-icon">
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
              onClick={() =>
                setMethod("card")
              }
            >
              <CreditCard size={22} />

              <div>
                <strong>
                  Card
                </strong>

                <span>
                  Credit / Debit Card
                </span>
              </div>

              {method === "card" && (
                <CheckCircle2
                  className="method-check"
                  size={20}
                />
              )}
            </button>

            <button
              type="button"
              className={
                method === "upi"
                  ? "payment-method active"
                  : "payment-method"
              }
              onClick={() =>
                setMethod("upi")
              }
            >
              <Smartphone size={22} />

              <div>
                <strong>
                  UPI
                </strong>

                <span>
                  Pay using UPI ID
                </span>
              </div>

              {method === "upi" && (
                <CheckCircle2
                  className="method-check"
                  size={20}
                />
              )}
            </button>

            <button
              type="button"
              className={
                method === "gpay"
                  ? "payment-method active"
                  : "payment-method"
              }
              onClick={() =>
                setMethod("gpay")
              }
            >
              <span className="gpay-icon">
                G
              </span>

              <div>
                <strong>
                  Google Pay
                </strong>

                <span>
                  Pay with GPay
                </span>
              </div>

              {method === "gpay" && (
                <CheckCircle2
                  className="method-check"
                  size={20}
                />
              )}
            </button>

          </div>

          {/* FORM */}

          <form
            onSubmit={handlePayment}
            className="payment-form"
          >

            {method === "card" && (
              <>
                <div className="payment-field">

                  <label>
                    Cardholder Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter cardholder name"
                    value={cardName}
                    onChange={(e) =>
                      setCardName(
                        e.target.value
                      )
                    }
                  />

                </div>

                <div className="payment-field">

                  <label>
                    Card Number
                  </label>

                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    value={cardNumber}
                    onChange={(e) =>
                      setCardNumber(
                        formatCardNumber(
                          e.target.value
                        )
                      )
                    }
                  />

                </div>

                <div className="payment-field-row">

                  <div className="payment-field">

                    <label>
                      Expiry Date
                    </label>

                    <input
                      type="text"
                      placeholder="MM/YY"
                      maxLength={5}
                      value={expiry}
                      onChange={(e) =>
                        setExpiry(
                          e.target.value
                        )
                      }
                    />

                  </div>

                  <div className="payment-field">

                    <label>
                      CVV
                    </label>

                    <input
                      type="password"
                      placeholder="•••"
                      maxLength={3}
                      value={cvv}
                      onChange={(e) =>
                        setCvv(
                          e.target.value.replace(
                            /\D/g,
                            ""
                          )
                        )
                      }
                    />

                  </div>

                </div>

                <button
                  type="button"
                  className="demo-card-btn"
                  onClick={useDemoCard}
                >
                  🧪 Use Demo Card
                </button>

                <div className="demo-card-text">
                  4111 1111 1111 1111
                  <br />
                  Any Name • 12/30 • 123
                </div>
              </>
            )}

            {(method === "upi" ||
              method === "gpay") && (
              <div className="upi-section">

                <div className="upi-big-icon">
                  {method === "gpay"
                    ? "G"
                    : "UPI"}
                </div>

                <h3>
                  {method === "gpay"
                    ? "Google Pay"
                    : "UPI Payment"}
                </h3>

                <p>
                  Enter your demo UPI ID
                  to continue.
                </p>

                <div className="payment-field">

                  <label>
                    UPI ID
                  </label>

                  <input
                    type="text"
                    placeholder="example@upi"
                    value={upiId}
                    onChange={(e) =>
                      setUpiId(
                        e.target.value
                      )
                    }
                  />

                </div>

                <div className="demo-upi">
                  🧪 Demo UPI:
                  <strong>
                    demo@upi
                  </strong>
                </div>

              </div>
            )}

            {/* PAY */}

            <button
              type="submit"
              className="pay-button"
              disabled={processing}
            >

              {processing ? (
                <>
                  <span className="payment-spinner"></span>
                  Processing Payment...
                </>
              ) : (
                <>
                  <LockKeyhole size={19} />
                  Pay ₹
                  {total.toLocaleString(
                    "en-IN"
                  )}
                </>
              )}

            </button>

          </form>

          <div className="payment-security">

            <ShieldCheck size={19} />

            <span>
              Secure & Encrypted Demo Payment
            </span>

          </div>

        </section>

      </main>

      {/* BACK */}

      <button
        className="payment-back-btn"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={17} />
        Back to OTP
      </button>

      <footer className="payment-footer">
        © 2026 EventBook • Safe & Secure Event Booking
      </footer>

    </div>
  );
}

export default Payment;