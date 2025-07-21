import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";
import { Button, Stack, TextField, MenuItem, Alert } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

const Signup = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "security",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || "Account created successfully!");
        setMessageType("success");
        // Reset form
        setForm({
          full_name: "",
          email: "",
          password: "",
          role: "security",
        });
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setMessage(data.message || "Error creating account");
        setMessageType("error");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Please try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const goToLogin = () => {
    navigate("/login");
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
        <h2 className="MainText">Create Account</h2>

        <form className="signupForm" onSubmit={handleSignup}>
          {message && (
            <Alert
              severity={messageType === "success" ? "success" : "error"}
              className={
                messageType === "success" ? "successAlert" : "errorAlert"
              }
            >
              {message}
            </Alert>
          )}

          <TextField
            label="Full Name"
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            fullWidth
            required
            className="textField"
            placeholder="Enter your full name"
          />

          <TextField
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            required
            className="textField"
            placeholder="Enter your email"
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            required
            className="textField"
            placeholder="Enter your password"
          />

          <TextField
            label="Role"
            name="role"
            select
            value={form.role}
            onChange={handleChange}
            fullWidth
            className="textField"
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="security">Security</MenuItem>
          </TextField>

          <Button
            type="submit"
            variant="outlined"
            disabled={loading}
            className="submitBtn"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>

          <div className="linkContainer">
            <Button variant="text" onClick={goToLogin} className="linkBtn">
              Already have an account? Login
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

export default Signup;
