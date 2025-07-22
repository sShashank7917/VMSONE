import { useEffect, useState } from "react";
import "./PreRegisteredPage.css";
import { Stack, CircularProgress } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import FaceScanModal from "../FaceScanPage/FaceScan";
import { useNavigate } from "react-router-dom";

const PreRegisteredPage = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");
  const [faceScanOpen, setFaceScanOpen] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  const navigate = useNavigate();

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

  const handleFaceCapture = async (imageData: string) => {
    setIsMatching(true);
    setFaceScanOpen(false); // Close the modal immediately
    
    // send captured face to backend for validation
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/returning-visitor/match-face`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ face_image: imageData }),
        }
      );

      const data = await res.json();

      if (res.ok && data.visitor) {
        // save visitor data in localStorage or state mgmt for pre-filling
        localStorage.setItem("prefillVisitor", JSON.stringify(data.visitor));
        navigate("/returning-visitor-form");
      } else {
        setIsMatching(false);
        alert(data.message || "Face not recognized. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setIsMatching(false);
      alert("Error validating face.");
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
        <h2 className="MainText">Returning Visitor Verification</h2>
        <p className="subText">
          {isMatching ? "Verifying your identity..." : "Please scan your face to continue"}
        </p>

        <div className="face-scan-section">
          {isMatching ? (
            <div className="loading-container">
              <CircularProgress 
                size={60} 
                thickness={4}
                sx={{ 
                  color: 'white',
                  '& .MuiCircularProgress-circle': {
                    strokeLinecap: 'round',
                  }
                }}
              />
              <div className="loading-text">
                <div className="loading-title">Matching Face...</div>
                <div className="loading-subtitle">Please wait while we verify your identity</div>
              </div>
            </div>
          ) : (
            <div className="face-scan-card" onClick={() => setFaceScanOpen(true)}>
              <div className="face-scan-icon">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </div>
              <div className="face-scan-text">
                <div className="face-scan-title">Face Scan Required</div>
                <div className="face-scan-subtitle">
                  Click to capture and verify
                </div>
              </div>
            </div>
          )}
        </div>
      </Stack>

      <div className="BottomRightContainer">
        <div className="textContainer">
          <div>Powered By</div>
          <div>VMSONE</div>
        </div>
        <SettingsIcon fontSize="small" />
      </div>

      <FaceScanModal
        open={faceScanOpen}
        onClose={() => setFaceScanOpen(false)}
        onCapture={handleFaceCapture}
      />
    </div>
  );
};

export default PreRegisteredPage;