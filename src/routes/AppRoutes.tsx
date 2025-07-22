import { Routes, Route } from "react-router-dom";
import Home from "../pages/HomePage/Home";
import CheckIn from "../pages/CheckInPage/CheckIn";
import Dashboard from "../pages/DashboardPage/Dashboard";
import NewVisitorForm from "../pages/NewVisitorFormPage/NewVisitorForm";
import OTPVerification from "../pages/OTPValidationPage/OtpValidationPage";
import Login from "../pages/Login/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import SignupPage from "../pages/SignUp/SignupPage";
import PreRegisteredPage from "../pages/PreRegisteredPage/PreRegisteredPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/PreRegistred" element={<PreRegisteredPage/>} />


      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/check-in"
        element={
          <ProtectedRoute allowedRoles={["security"]}>
            <CheckIn />
          </ProtectedRoute>
        }
      />

      <Route
        path="/newVisitor"
        element={
          <ProtectedRoute allowedRoles={["security"]}>
            <NewVisitorForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/otpValidation"
        element={
          <ProtectedRoute allowedRoles={["security"]}>
            <OTPVerification
              onVerificationSuccess={() => console.log("OTP verified!")}
              onBackToWelcome={() => window.location.href = "/check-in"}
            />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
