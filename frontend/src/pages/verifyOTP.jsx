import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ShieldCheck,
  LockKeyhole,
  Smartphone,
  CheckCircle2,
  Ticket,
} from "lucide-react";

function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();

  const bookingData = location.state || {};

  const [otp, setOtp] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const inputRefs = useRef([]);

  useEffect(() => {
    if (!bookingData.phone) {
      navigate("/booking", {
        replace: true,
      });
    }
  }, [bookingData.phone, navigate]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) {
      return;
    }

    const digit = value.slice(-1);

    const newOtp = [...otp];

    newOtp[index] = digit;

    setOtp(newOtp);
    setError("");

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pasted) return;

    const newOtp = [
      "",
      "",
      "",
      "",
      "",
      "",
    ];

    pasted.split("").forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);

    inputRefs.current[
      Math.min(pasted.length, 5)
    ]?.focus();
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      setError(
        "Please enter the complete 6-digit OTP."
      );
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:8080/api/otp/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: bookingData.phone,
            otp: enteredOtp,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.verified) {
        setError(
          data.message || "Invalid OTP. Please try again."
        );

        setOtp([
          "",
          "",
          "",
          "",
          "",
          "",
        ]);

        setTimeout(() => {
          inputRefs.current[0]?.focus();
        }, 100);

        return;
      }

      navigate("/payment", {
        replace: true,
        state: {
          ...bookingData,
          verified: true,
          otpVerified: true,
          bookingStatus: "OTP_VERIFIED",
        },
      });

    } catch (err) {
      console.error(err);

      setError(
        "Unable to connect to backend. Please check the server."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!bookingData.phone) {
    return null;
  }

  return (
    <div className="verify-page">

      <div className="verify-background-circle circle-one" />
      <div className="verify-background-circle circle-two" />

      <button
        className="verify-back"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={18} />
        Back to Booking
      </button>

      <div className="verify-card">

        {/* TOP ICON */}
        <div className="verify-icon-wrapper">
          <div className="verify-icon">
            <Smartphone size={30} />
          </div>

          <div className="verify-check">
            <CheckCircle2 size={17} />
          </div>
        </div>

        <p className="verify-step">
          STEP 02 • SECURITY CHECK
        </p>

        <h1>Verify your OTP</h1>

        <p className="verify-description">
          Enter the 6-digit demo OTP generated
          for your booking.
        </p>

        {/* PHONE */}
        <div className="verify-phone-box">

          <div className="verify-phone-icon">
            <Smartphone size={19} />
          </div>

          <div>
            <span>Verification number</span>
            <strong>
              +91 {bookingData.phone}
            </strong>
          </div>

        </div>

        {/* OTP FORM */}
        <form onSubmit={handleVerify}>

          <label className="verify-label">
            Enter OTP
          </label>

          <div
            className="verify-inputs"
            onPaste={handlePaste}
          >
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                autoFocus={index === 0}
                onChange={(e) =>
                  handleChange(
                    index,
                    e.target.value
                  )
                }
                onKeyDown={(e) =>
                  handleKeyDown(index, e)
                }
              />
            ))}
          </div>

          {error && (
            <div className="verify-error">
              {error}
            </div>
          )}

          {/* DEMO INFO */}
          <div className="demo-otp-box">

            <div className="demo-otp-icon">
              <Ticket size={18} />
            </div>

            <div>
              <strong>Demo OTP</strong>

              <p>
                A new 6-digit OTP is generated
                every time you continue from
                the booking page.
              </p>
            </div>

          </div>

          <button
            type="submit"
            className="verify-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="verify-spinner" />
                Verifying...
              </>
            ) : (
              <>
                Verify & Continue
                <ArrowLeft
                  size={19}
                  style={{
                    transform:
                      "rotate(180deg)",
                  }}
                />
              </>
            )}
          </button>

        </form>

        {/* SECURITY */}
        <div className="verify-security">

          <LockKeyhole size={15} />

          <span>
            Secure OTP verification
          </span>

        </div>

      </div>

      {/* CSS */}
      <style>{`

        .verify-page {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          background:
            radial-gradient(
              circle at top left,
              rgba(99,102,241,.14),
              transparent 35%
            ),
            #f7f8fc;
          font-family:
            Inter, Arial, sans-serif;
          color: #172033;
        }

        .verify-background-circle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }

        .circle-one {
          width: 350px;
          height: 350px;
          right: -160px;
          top: -140px;
          background: rgba(99,102,241,.07);
        }

        .circle-two {
          width: 280px;
          height: 280px;
          left: -150px;
          bottom: -130px;
          background: rgba(79,70,229,.06);
        }

        .verify-back {
          position: absolute;
          top: 35px;
          left: 35px;
          border: none;
          background: transparent;
          display: flex;
          align-items: center;
          gap: 7px;
          color: #626d7e;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          z-index: 5;
        }

        .verify-back:hover {
          color: #4f46e5;
        }

        .verify-card {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 470px;
          padding: 38px;
          background: rgba(255,255,255,.97);
          border: 1px solid #e5e8ef;
          border-radius: 26px;
          box-shadow:
            0 25px 70px rgba(30,41,59,.10);
          text-align: center;
        }

        .verify-icon-wrapper {
          position: relative;
          width: 70px;
          height: 70px;
          margin: 0 auto 20px;
        }

        .verify-icon {
          width: 70px;
          height: 70px;
          border-radius: 22px;
          background: #eef2ff;
          color: #4f46e5;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .verify-check {
          position: absolute;
          right: -5px;
          bottom: -4px;
          width: 25px;
          height: 25px;
          border-radius: 50%;
          background: #22c55e;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid white;
        }

        .verify-step {
          margin: 0 0 9px;
          color: #6366f1;
          font-size: 10px;
          letter-spacing: 1.5px;
          font-weight: 900;
        }

        .verify-card h1 {
          margin: 0;
          font-size: 30px;
          line-height: 1.2;
        }

        .verify-description {
          margin: 12px auto 25px;
          max-width: 360px;
          color: #7a8495;
          font-size: 14px;
          line-height: 1.6;
        }

        .verify-phone-box {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px;
          background: #f8f9fc;
          border: 1px solid #e8ebf1;
          border-radius: 14px;
          text-align: left;
          margin-bottom: 25px;
        }

        .verify-phone-icon {
          width: 40px;
          height: 40px;
          border-radius: 11px;
          background: #eef2ff;
          color: #4f46e5;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .verify-phone-box span {
          display: block;
          font-size: 10px;
          color: #8b95a5;
          margin-bottom: 3px;
        }

        .verify-phone-box strong {
          font-size: 14px;
        }

        .verify-label {
          display: block;
          text-align: left;
          font-size: 13px;
          font-weight: 800;
          margin-bottom: 11px;
        }

        .verify-inputs {
          display: flex;
          justify-content: center;
          gap: 9px;
        }

        .verify-inputs input {
          width: 50px;
          height: 57px;
          border: 1px solid #dce1e9;
          border-radius: 12px;
          background: white;
          outline: none;
          text-align: center;
          font-size: 23px;
          font-weight: 800;
          color: #172033;
          transition: .2s;
        }

        .verify-inputs input:focus {
          border-color: #6366f1;
          box-shadow:
            0 0 0 4px rgba(99,102,241,.10);
          transform: translateY(-2px);
        }

        .verify-error {
          margin-top: 15px;
          padding: 11px 13px;
          border-radius: 10px;
          background: #fff0f0;
          border: 1px solid #ffd4d4;
          color: #c53030;
          font-size: 12px;
          text-align: left;
        }

        .demo-otp-box {
          margin-top: 20px;
          padding: 14px;
          border-radius: 13px;
          background: #f4f5ff;
          border: 1px solid #e2e4ff;
          display: flex;
          align-items: flex-start;
          gap: 11px;
          text-align: left;
        }

        .demo-otp-icon {
          width: 34px;
          height: 34px;
          flex-shrink: 0;
          border-radius: 9px;
          background: white;
          color: #6366f1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .demo-otp-box strong {
          display: block;
          font-size: 12px;
          color: #4f46e5;
        }

        .demo-otp-box p {
          margin: 4px 0 0;
          font-size: 11px;
          color: #737d90;
          line-height: 1.5;
        }

        .verify-button {
          width: 100%;
          height: 53px;
          margin-top: 20px;
          border: none;
          border-radius: 13px;
          background:
            linear-gradient(
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
          gap: 9px;
          cursor: pointer;
          box-shadow:
            0 10px 25px rgba(79,70,229,.20);
        }

        .verify-button:hover {
          transform: translateY(-1px);
        }

        .verify-button:disabled {
          opacity: .65;
          cursor: not-allowed;
        }

        .verify-spinner {
          width: 17px;
          height: 17px;
          border: 2px solid rgba(255,255,255,.4);
          border-top-color: white;
          border-radius: 50%;
          animation:
            verifySpin .7s linear infinite;
        }

        @keyframes verifySpin {
          to {
            transform: rotate(360deg);
          }
        }

        .verify-security {
          margin-top: 18px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 6px;
          color: #8b95a5;
          font-size: 11px;
        }

        @media (max-width: 600px) {

          .verify-page {
            padding: 25px 14px;
          }

          .verify-back {
            position: static;
            align-self: flex-start;
            margin-bottom: 15px;
          }

          .verify-card {
            padding: 28px 20px;
          }

          .verify-inputs {
            gap: 6px;
          }

          .verify-inputs input {
            width: 43px;
            height: 52px;
          }

          .verify-card h1 {
            font-size: 26px;
          }

        }

      `}</style>
    </div>
  );
}

export default VerifyOTP;