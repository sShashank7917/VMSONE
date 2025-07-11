import { useEffect, useState } from "react";
import styles from "./NewVisitor.module.css";
import { Button, Stack, TextField, MenuItem } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
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
    <div className={styles.container}>
      <div className={styles.MainHeaderContainer}>
        <div className={styles.timeContainer}>
          <div className={styles.time}>{time}</div>
          <div className={styles.bar}></div>
          <div className={styles.dateContainer}>
            <div className={styles.day}>{day}</div>
            <div className={styles.date}>{date}</div>
          </div>
        </div>

        <div className={styles.logoContainer}>
          <img src="/logo-white.png" alt="Logo" className={styles.logo} />
        </div>
      </div>

      <Stack className={styles.CenterContainer}>
        <h2 className={styles.MainText}>New Visitor Form</h2>
        <form className={styles.form}>
          <TextField label="Name" variant="outlined" fullWidth />
          <TextField label="Phone" variant="outlined" fullWidth />
          <TextField label="Email" variant="outlined" fullWidth />
          <TextField label="Nationality" variant="outlined" fullWidth />
          <TextField label="Company" variant="outlined" fullWidth />
          <TextField label="Purpose" variant="outlined" fullWidth />
          <TextField label="Host" variant="outlined" fullWidth />
          <TextField
            label="Category"
            variant="outlined"
            select
            fullWidth
          >
            <MenuItem value="Employee">Employee</MenuItem>
            <MenuItem value="Guest">Guest</MenuItem>
            <MenuItem value="Contractor">Contractor</MenuItem>
          </TextField>
          <TextField label="ID Proof" variant="outlined" fullWidth />
          <TextField label="Vehicle & Asset Details" variant="outlined" fullWidth />

          <Button
            variant="outlined"
            type="submit"
            className={styles.submitBtn}
          >
            Submit
          </Button>
        </form>
      </Stack>

      <div className={styles.BottomContainer}>
        <Button
          variant="outlined"
          startIcon={<LogoutIcon fontSize="small" />}
          className={styles.checkOutBtn}
        >
          Log-out
        </Button>
        <Stack className={styles.barBottom}></Stack>
        <Button
          variant="text"
          startIcon={<ChangeCircleIcon fontSize="small" />}
          className={styles.languageButton}
        >
          English
        </Button>
        <div className={styles.BottomRightContainer}>
          <div className={styles.textContainer}>
            <div>Powered By</div>
            <div>VMSONE</div>
          </div>
          <SettingsIcon fontSize="small" />
        </div>
      </div>
    </div>
  );
};

export default NewVisitorForm;
