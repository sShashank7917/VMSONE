import { useEffect, useState } from "react";
import "./NewVisitor.css";
import { Button, Stack, TextField, MenuItem } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

const NewVisitorForm = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");

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
        <form className="form">
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            className="textField"
          />

          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            className="textField"
          />
          <TextField
            label="Email Address"
            variant="outlined"
            fullWidth
            className="textField"
          />
          <TextField
            label="Nationality"
            variant="outlined"
            fullWidth
            className="textField"
          />
          <TextField
            label="Company/Organization"
            variant="outlined"
            fullWidth
            className="textField"
          />
          <TextField
            label="Purpose of Visit"
            variant="outlined"
            fullWidth
            className="textField"
          />
          <TextField
            label="Host/Person to Meet"
            variant="outlined"
            fullWidth
            className="textField"
          />
          <TextField
            label="Visitor Category"
            variant="outlined"
            select
            fullWidth
            className="textField"
          >
            <MenuItem value="Employee">Employee</MenuItem>
            <MenuItem value="Guest">Guest</MenuItem>
            <MenuItem value="Contractor">Contractor</MenuItem>
          </TextField>
          <TextField
            label="ID Proof Number"
            variant="outlined"
            fullWidth
            className="textField"
          />
          <TextField
            label="Vehicle & Asset Details"
            variant="outlined"
            fullWidth
            className="textField"
          />

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
