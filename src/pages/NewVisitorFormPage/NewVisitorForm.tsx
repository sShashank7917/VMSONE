import { useEffect, useState } from "react";
import "./NewVisitor.css";
import { Button, Stack, TextField, MenuItem } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

const NewVisitorForm = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");

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

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};


const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:3000/api/visitors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message || "Visitor registered successfully!");
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
    } else {
      alert(data.message || "Error registering visitor.");
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
        <h2 className="MainText">Enter Your Details</h2>
        <form className="form" onSubmit={handleSubmit}>
          <TextField label="Full Name" name="full_name" value={formData.full_name} onChange={handleChange} fullWidth className="textField" />

          <TextField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} fullWidth className="textField" />

          <TextField label="Email Address" name="email" value={formData.email} onChange={handleChange} fullWidth className="textField" />

          <TextField label="Nationality" name="nationality" value={formData.nationality} onChange={handleChange} fullWidth className="textField" />

          <TextField label="Company/Organization" name="company" value={formData.company} onChange={handleChange} fullWidth className="textField" />

          <TextField label="Purpose of Visit" name="purpose" value={formData.purpose} onChange={handleChange} fullWidth className="textField" />

          <TextField label="Host/Person to Meet" name="host" value={formData.host} onChange={handleChange} fullWidth className="textField" />

          <TextField label="Visitor Category" name="category" select value={formData.category} onChange={handleChange} fullWidth className="textField">
            <MenuItem value="Employee">Employee</MenuItem>
            <MenuItem value="Guest">Guest</MenuItem>
            <MenuItem value="Contractor">Contractor</MenuItem>
          </TextField>

          <TextField label="ID Proof Type" name="id_proof_type" select value={formData.id_proof_type} onChange={handleChange} fullWidth className="textField">
            <MenuItem value="Adhaar">ADHAAR</MenuItem>
            <MenuItem value="Pan">PAN</MenuItem>
            <MenuItem value="DL">DRIVING LICENSE</MenuItem>
            <MenuItem value="Passport">PASSPORT</MenuItem>
          </TextField>

          <TextField label="ID Proof Number" name="id_proof_number" value={formData.id_proof_number} onChange={handleChange} fullWidth className="textField" />

          <TextField label="Vehicle Details" name="vehicle_details" value={formData.vehicle_details} onChange={handleChange} fullWidth className="textField" />

          <TextField label="Asset Details" name="asset_details" value={formData.asset_details} onChange={handleChange} fullWidth className="textField" />

          <Button variant="outlined" type="submit" className="submitBtn">
            Submit Details
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
    </div>
  );
};

export default NewVisitorForm;
