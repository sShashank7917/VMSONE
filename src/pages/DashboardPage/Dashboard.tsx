import { Container, Typography } from "@mui/material";

const Dashboard = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Typography variant="h3" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="body1">
        Welcome to the Visitor Management System dashboard.  
        Here you can monitor visitor activity, view logs, and manage settings.
      </Typography>
    </Container>
  );
};

export default Dashboard;
