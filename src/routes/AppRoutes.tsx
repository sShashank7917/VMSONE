import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/HomePage/Home";
import CheckIn from "../pages/CheckInPage/CheckIn";
import Dashboard from "../pages/DashboardPage/Dashboard";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../themes/theme";
import NewVisitorForm from "../pages/NewVisitorFormPage/NewVisitorForm";

const AppRoutes = () => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/check-in" element={<CheckIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/newVistor" element={<NewVisitorForm />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);

export default AppRoutes;
