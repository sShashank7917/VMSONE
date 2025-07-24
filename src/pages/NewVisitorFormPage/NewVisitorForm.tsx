import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./NewVisitor.css";
import { Button, Stack, TextField, MenuItem } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import FaceScanModal from "../FaceScanPage/FaceScan";

const NewVisitorForm = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");
  const [faceScanOpen, setFaceScanOpen] = useState(false);
  const [capturedFace, setCapturedFace] = useState<string | null>(null);

  // Get data passed from PreRegisteredPage
  const location = useLocation();
  const returningVisitorData = location.state;
  const isReturningVisitor = !!returningVisitorData?.visitor;

  // 💡 Form state
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    email: "",
    nationality: "",
    company: "",
    id_proof_type: "",
    id_proof_number: "",
    purpose: "",
    host: "",
    category: "",
    vehicle_details: "",
    asset_details: "",
  });

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

  // 🔥 Pre-populate form if returning visitor
  useEffect(() => {
    if (isReturningVisitor && returningVisitorData.visitor) {
      const visitor = returningVisitorData.visitor;
      setFormData((prev) => ({
        ...prev,
        full_name: visitor.full_name || "",
        phone: visitor.phone || "",
        email: visitor.email || "",
        nationality: visitor.nationality || "",
        company: visitor.company || "",
      }));

      // Mark face as already captured/verified
      setCapturedFace("verified_from_preregister");
    }
  }, [isReturningVisitor, returningVisitorData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFaceCapture = (imageData: string) => {
    setCapturedFace(imageData);
  };

  const base64ToBlob = (base64Data: string): Blob => {
    const parts = base64Data.split(";base64,");
    const mimeType = parts[0].split(":")[1];
    const byteString = atob(parts[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: mimeType });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!capturedFace) {
      alert("Please complete the face scan verification before submitting.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in.");
      return;
    }

    try {
      const formDataToSend = new FormData();

      // append form fields
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      // ✅ safely convert base64 to blob
      if (isReturningVisitor) {
        formDataToSend.append(
          "visitor_id",
          String(returningVisitorData.visitor.visitor_id)
        );
      } else {
        if (capturedFace && capturedFace.startsWith("data:image")) {
          const blob = base64ToBlob(capturedFace);
          formDataToSend.append("file", blob, "face.jpg");
        } else {
          alert("Invalid face image data.");
          return;
        }
      }

      if (isReturningVisitor) {
        formDataToSend.append(
          "visitor_id",
          String(returningVisitorData.visitor.visitor_id)
        );
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/visitors`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const data = await res.json();

      if (res.ok) {
        alert(
          data.message ||
            (isReturningVisitor
              ? "Visit logged successfully! Welcome back."
              : "Visitor registered successfully with face verification!")
        );

        setFormData({
          full_name: "",
          phone: "",
          email: "",
          nationality: "",
          company: "",
          id_proof_type: "",
          id_proof_number: "",
          purpose: "",
          host: "",
          category: "",
          vehicle_details: "",
          asset_details: "",
        });
        setCapturedFace(null);
      } else {
        alert(data.message || "Error submitting visitor.");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting visitor details");
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
        <h2 className="MainText">
          {isReturningVisitor
            ? "Welcome Back! Complete Your Visit"
            : "Enter Your Details"}
        </h2>

        {/* 🔥 Show welcome message for returning visitors */}
        {isReturningVisitor && (
          <div className="returning-visitor-banner">
            <p
              style={{
                color: "#4CAF50",
                marginBottom: "10px",
                fontSize: "14px",
              }}
            >
              ✓ Identity verified - {returningVisitorData.visitor.full_name}
            </p>
          </div>
        )}

        <form className="form" onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            fullWidth
            className="textField"
            required
            // 🔥 Make read-only for returning visitors
            InputProps={{
              readOnly: isReturningVisitor,
            }}
            sx={
              isReturningVisitor
                ? {
                    "& .MuiInputBase-input": {
                      backgroundColor: "#f5f5f5",
                      color: "#666",
                    },
                  }
                : {}
            }
          />

          <TextField
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            className="textField"
            required
            InputProps={{
              readOnly: isReturningVisitor,
            }}
            sx={
              isReturningVisitor
                ? {
                    "& .MuiInputBase-input": {
                      backgroundColor: "#f5f5f5",
                      color: "#666",
                    },
                  }
                : {}
            }
          />

          <TextField
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            className="textField"
            required
            InputProps={{
              readOnly: isReturningVisitor,
            }}
            sx={
              isReturningVisitor
                ? {
                    "& .MuiInputBase-input": {
                      backgroundColor: "#f5f5f5",
                      color: "#666",
                    },
                  }
                : {}
            }
          />

          <TextField
            label="Nationality"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            fullWidth
            className="textField"
            required
            InputProps={{
              readOnly: isReturningVisitor,
            }}
            sx={
              isReturningVisitor
                ? {
                    "& .MuiInputBase-input": {
                      backgroundColor: "#f5f5f5",
                      color: "#666",
                    },
                  }
                : {}
            }
          />

          <TextField
            label="Company/Organization"
            name="company"
            value={formData.company}
            onChange={handleChange}
            fullWidth
            className="textField"
            InputProps={{
              readOnly: isReturningVisitor,
            }}
            sx={
              isReturningVisitor
                ? {
                    "& .MuiInputBase-input": {
                      backgroundColor: "#f5f5f5",
                      color: "#666",
                    },
                  }
                : {}
            }
          />

          <TextField
            label="Purpose of Visit"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            fullWidth
            className="textField"
            required
          />

          <TextField
            label="Host/Person to Meet"
            name="host"
            value={formData.host}
            onChange={handleChange}
            fullWidth
            className="textField"
            required
          />

          <TextField
            label="Visitor Category"
            name="category"
            select
            value={formData.category}
            onChange={handleChange}
            fullWidth
            className="textField"
            required
          >
            <MenuItem value="">Select Category</MenuItem>
            <MenuItem value="Employee">Employee</MenuItem>
            <MenuItem value="Guest">Guest</MenuItem>
            <MenuItem value="Contractor">Contractor</MenuItem>
          </TextField>

          <TextField
            label="ID Proof Type"
            name="id_proof_type"
            select
            value={formData.id_proof_type}
            onChange={handleChange}
            fullWidth
            className="textField"
            required
          >
            <MenuItem value="">Select ID Proof</MenuItem>
            <MenuItem value="Adhaar">ADHAAR</MenuItem>
            <MenuItem value="Pan">PAN</MenuItem>
            <MenuItem value="DL">DRIVING LICENSE</MenuItem>
            <MenuItem value="Passport">PASSPORT</MenuItem>
          </TextField>

          <TextField
            label="ID Proof Number"
            name="id_proof_number"
            value={formData.id_proof_number}
            onChange={handleChange}
            fullWidth
            className="textField"
            required
          />

          <TextField
            label="Vehicle Details"
            name="vehicle_details"
            value={formData.vehicle_details}
            onChange={handleChange}
            fullWidth
            className="textField"
          />

          <TextField
            label="Asset Details"
            name="asset_details"
            value={formData.asset_details}
            onChange={handleChange}
            fullWidth
            className="textField"
          />

          {/* 🔥 Face Scan Section - Modified for returning visitors */}
          <div className="face-scan-section">
            <div
              className={`face-scan-card ${capturedFace ? "verified" : ""}`}
              onClick={() => !isReturningVisitor && setFaceScanOpen(true)}
              style={isReturningVisitor ? { cursor: "default" } : {}}
            >
              <div className="face-scan-icon">
                {capturedFace ? (
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 12l2 2 4-4" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                ) : (
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
                )}
              </div>
              <div className="face-scan-text">
                <div className="face-scan-title">
                  {capturedFace
                    ? isReturningVisitor
                      ? "Face Already Verified ✓"
                      : "Face Verified ✓"
                    : "Face Scan Required"}
                </div>
                <div className="face-scan-subtitle">
                  {capturedFace
                    ? isReturningVisitor
                      ? `Verified with ${(100 - returningVisitorData.distance * 100).toFixed(1)}% confidence`
                      : "Click to retake photo"
                    : "Click to capture your photo"}
                </div>
              </div>
            </div>
          </div>

          <Button variant="outlined" type="submit" className="submitBtn">
            {isReturningVisitor ? "Complete Check-in" : "Submit Details"}
          </Button>
        </form>
      </Stack>

      <div className="BottomRightContainer">
        <div className="textContainer">
          <div>Powered By</div>
          <div>VMSONE</div>
        </div>
        <SettingsIcon fontSize="small" />
      </div>

      {/* 🔥 Face Scan Modal - Only for new visitors */}
      {!isReturningVisitor && (
        <FaceScanModal
          open={faceScanOpen}
          onClose={() => setFaceScanOpen(false)}
          onCapture={handleFaceCapture}
        />
      )}
    </div>
  );
};

export default NewVisitorForm;
