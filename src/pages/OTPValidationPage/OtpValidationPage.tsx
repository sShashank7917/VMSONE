import { useEffect, useState } from "react";
import "./OtpValidation.css";
import { Button, Stack, TextField } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

interface OTPVerificationProps {
  onVerificationSuccess: () => void;
  onBackToWelcome: () => void;
}

const OTPVerification = ({ onVerificationSuccess, onBackToWelcome }: OTPVerificationProps) => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");

  // 💡 Form state
  const [formData, setFormData] = useState({
    mobile: "",
    otp: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const dayStr = now.toLocaleDateString(undefined, { weekday: "long" });
      const dateStr = now.toLocaleDateString();

      setTime(`${hours}:${minutes}`);
      setDate(dateStr);
      setDay(dayStr);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Countdown timer for resend OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSendOTP = async () => {
    if (!formData.mobile || formData.mobile.length < 10) {
      alert("Please enter a valid mobile number");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: formData.mobile }),
      });

      const data = await res.json();

      if (res.ok) {
        setOtpSent(true);
        setCountdown(60); // 60 seconds countdown
        alert("OTP sent successfully!");
      } else {
        alert(data.message || "Error sending OTP");
      }
    } catch (err) {
      console.error(err);
      alert("Error sending OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!formData.otp || formData.otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobile: formData.mobile,
          otp: formData.otp,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("OTP verified successfully!");
        onVerificationSuccess();
      } else {
        alert(data.message || "Invalid OTP");
      }
    } catch (err) {
      console.error(err);
      alert("Error verifying OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = () => {
    if (countdown === 0) {
      handleSendOTP();
    }
  };

  return (
    <div className="container">
      <div className="MainHeaderContainer">
        <div className="timeContainer">
          <div className="time">{time}</div>
          <div className="bar"></div>
          <div className="dateContainer">
            <div className="day">{day}</div>
            <div className="date">{date}</div>
          </div>
        </div>

        <div className="logoContainer">
          <img src="/logo-white.png" alt="Logo" className="logo" />
        </div>
      </div>

      <Stack className="CenterContainer">
        <h2 className="MainText">Mobile Verification</h2>
        
        <div className="otpContainer">
          {!otpSent ? (
            // Mobile Number Input
            <div className="mobileSection">
              <TextField
                label="Mobile Number"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                fullWidth
                className="textField"
                placeholder="Enter your 10-digit mobile number"
                inputProps={{ maxLength: 10 }}
              />
              
              <Button
                variant="outlined"
                onClick={handleSendOTP}
                disabled={isLoading}
                className="submitBtn"
              >
                {isLoading ? "Sending..." : "Send OTP"}
              </Button>
            </div>
          ) : (
            // OTP Input
            <div className="otpSection">
              <div className="otpInfo">
                <p className="otpSentText">
                  OTP sent to +91 {formData.mobile}
                </p>
              </div>

              <TextField
                label="Enter OTP"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                fullWidth
                className="textField"
                placeholder="Enter 6-digit OTP"
                inputProps={{ maxLength: 6 }}
              />

              <div className="otpActions">
                <Button
                  variant="outlined"
                  onClick={handleVerifyOTP}
                  disabled={isLoading}
                  className="submitBtn"
                >
                  {isLoading ? "Verifying..." : "Verify OTP"}
                </Button>

                <div className="resendSection">
                  {countdown > 0 ? (
                    <p className="countdownText">
                      Resend OTP in {countdown}s
                    </p>
                  ) : (
                    <Button
                      variant="text"
                      onClick={handleResendOTP}
                      className="resendBtn"
                      disabled={isLoading}
                    >
                      Resend OTP
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}

          <Button
            variant="text"
            onClick={onBackToWelcome}
            className="backBtn"
          >
            ← Back to Welcome
          </Button>
        </div>
      </Stack>

      <div className="BottomRightContainer">
        <div className="textContainer">
          <div>Powered By</div>
          <div>VMSONE</div>
        </div>
        <SettingsIcon fontSize="small" />
      </div>
    </div>
  );
};

export default OTPVerification;