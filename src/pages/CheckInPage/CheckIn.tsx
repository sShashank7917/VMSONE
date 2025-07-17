import { useEffect, useState } from "react";
import styles from "./CheckIn.module.css";
import { Button, Stack, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LogoutIcon from "@mui/icons-material/Logout";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";


const CheckIn = () => {
  const navigate = useNavigate();

  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const day = now.toLocaleDateString(undefined, { weekday: "long" });
      const dateStr = now.toLocaleDateString();

      setTime(`${hours}:${minutes}`);
      setDate(`${dateStr}`);
      setDay(`${day}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

    const handleNewVisitorIn = () => {
    navigate("/newVisitor");
  };


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
        <Typography className={styles.MainText}>Welcome To</Typography>
        <Typography className={styles.SecondaryText}>VMS ONE</Typography>
      </Stack>

      <Stack className={styles.ButtonContainer}>
        <Button
          variant="outlined"
          endIcon={<ArrowForwardIosIcon fontSize="small" />}
          className={styles.newVistorBtn}
          onClick={handleNewVisitorIn}
        >
          New Visitor
        </Button>
        <Button
          variant="outlined"
          endIcon={<ArrowForwardIosIcon fontSize="small" />}
          className={styles.preInvitedBtn}
        >
          Pre-Invited
        </Button>
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
          endIcon={<ArrowForwardIosIcon fontSize="small" />}
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

export default CheckIn;
