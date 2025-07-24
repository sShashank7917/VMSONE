import React, { Component, type ReactNode } from "react";
import "./ErrorBoundary.css";
import SettingsIcon from "@mui/icons-material/Settings";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  errorInfo?: string;
  time: string;
  date: string;
  day: string;
};

class ErrorBoundary extends Component<Props, State> {
  private timer?: NodeJS.Timeout;

  state: State = {
    hasError: false,
    errorInfo: "",
    time: "",
    date: "",
    day: "",
  };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorInfo: error.message };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  componentDidMount() {
    this.updateTime();
    this.timer = setInterval(this.updateTime, 1000);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  updateTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const dayStr = now.toLocaleDateString(undefined, { weekday: "long" });
    const dateStr = now.toLocaleDateString();

    this.setState({
      time: `${hours}:${minutes}`,
      date: dateStr,
      day: dayStr,
    });
  };

  handleGoHome = () => {
    window.location.href = "/";
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <div className="MainHeaderContainer">
            <div className="timeContainer">
              <div className="time">{this.state.time}</div>
              <div className="bar"></div>
              <div className="dateContainer">
                <div className="day">{this.state.day}</div>
                <div className="date">{this.state.date}</div>
              </div>
            </div>

            <div className="logoContainer">
              <img src="/logo-white.png" alt="Logo" className="logo" />
            </div>
          </div>

          <div className="error-center-container">
            <div className="error-content">
              <div className="error-icon">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              
              <h1 className="error-title">Something went wrong</h1>
              <p className="error-subtitle">
                We encountered an unexpected error. Please try again.
              </p>
              
              {this.state.errorInfo && (
                <div className="error-details">
                  <p className="error-message">{this.state.errorInfo}</p>
                </div>
              )}

              <div className="error-actions">
                <button className="error-button primary" onClick={this.handleReload}>
                  Try Again
                </button>
                <button className="error-button secondary" onClick={this.handleGoHome}>
                  Go Home
                </button>
              </div>
            </div>
          </div>

          <div className="BottomRightContainer">
            <div className="textContainer">
              <div>Powered By</div>
              <div>VMSONE</div>
            </div>
            <SettingsIcon fontSize="small" />
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;