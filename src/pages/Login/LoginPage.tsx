import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { Button, Stack, TextField, Alert } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

const Login = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        const decoded: any = JSON.parse(atob(data.access_token.split(".")[1]));

        if (decoded.role === "admin") {
          navigate("/dashboard");
        } else if (decoded.role === "security") {
          navigate("/check-in");
        } else {
          navigate("/");
        }
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const goToSignup = () => {
    navigate("/signup");
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
        <h2 className="MainText">VMSONE Login</h2>
        
        <form className="loginForm" onSubmit={handleLogin}>
          {error && (
            <Alert severity="error" className="errorAlert">
              {error}
            </Alert>
          )}

          <TextField
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            className="textField"
            placeholder="Enter your email"
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            className="textField"
            placeholder="Enter your password"
          />

          <Button
            type="submit"
            variant="outlined"
            disabled={loading}
            className="submitBtn"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          <div className="linkContainer">
            <Button
              variant="text"
              onClick={goToSignup}
              className="linkBtn"
            >
              Don't have an account? Sign up
            </Button>
          </div>
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

export default Login;