import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import type { JSX } from "react";

interface JwtPayload {
  sub: number;
  email: string;
  role: string;
  exp: number;
  iat: number;
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: JSX.Element;
  allowedRoles: string[];
}) {
  const token = localStorage.getItem("token");

  if (!token) {
    // No token → redirect to login
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode<JwtPayload>(token);

    // Check if the token has expired
    const now = Date.now() / 1000;
    if (decoded.exp < now) {
      localStorage.removeItem("token");
      return <Navigate to="/login" replace />;
    }

    // Check if the user's role is allowed
    if (allowedRoles.includes(decoded.role)) {
      return children;
    } else {
      // Not authorized for this route
      return <Navigate to="/" replace />;
    }
  } catch (err) {
    // Invalid token → redirect
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }
}
