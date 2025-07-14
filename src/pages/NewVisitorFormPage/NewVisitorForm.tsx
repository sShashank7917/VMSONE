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
            placeholder="Enter Your Full Name"
          />

          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            className="textField"
            placeholder="Enter Your Phonenumber"
          />
          <TextField
            label="Email Address"
            variant="outlined"
            fullWidth
            className="textField"
            placeholder="Enter Your Email"
          />
          <TextField
            label="Nationality"
            variant="outlined"
            fullWidth
            className="textField"
            placeholder="Enter nationality"
          />
          <TextField
            label="Company/Organization"
            variant="outlined"
            fullWidth
            className="textField"
            placeholder="Enter Your Organization"
          />
          <TextField
            label="Purpose of Visit"
            variant="outlined"
            fullWidth
            className="textField"
            placeholder="Purpoose of visit"
          />
          <TextField
            label="Host/Person to Meet"
            variant="outlined"
            fullWidth
            className="textField"
            placeholder="Enter Host Name"
          />
          <TextField
            label="Visitor Category"
            variant="outlined"
            select
            fullWidth
            className="textField"
            placeholder="Enter Category"
          >
            <MenuItem value="Employee">Employee</MenuItem>
            <MenuItem value="Guest">Guest</MenuItem>
            <MenuItem value="Contractor">Contractor</MenuItem>
          </TextField>
          <TextField
            label="ID Proof Type"
            variant="outlined"
            select
            fullWidth
            className="textField"
            placeholder="ID Proof Type"
          >
            <MenuItem value="Adhaar">ADHAAR</MenuItem>
            <MenuItem value="Pan">PAN</MenuItem>
            <MenuItem value="DL">DRIVING LICENSE</MenuItem>
            <MenuItem value="Passport">PASSPORT</MenuItem>
          </TextField>
          <TextField
            label="ID Proof Number"
            variant="outlined"
            fullWidth
            className="textField"
            placeholder="Enter ID proof Number "
          />
          <TextField
            label="Vehicle Details"
            variant="outlined"
            fullWidth
            className="textField"
            placeholder="Enter vehicle Details if any"
          />
          <TextField
            label="Asset Details"
            variant="outlined"
            fullWidth
            className="textField"
            placeholder="List of Assets"
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
