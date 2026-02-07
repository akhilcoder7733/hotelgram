import { Button, Container, Typography, Paper } from "@mui/material";

function App() {
  return (
    <Container sx={{ py: 6 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Hotelgram.com
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Premium hotel booking experience
        </Typography>
        <Button variant="contained" color="primary">
          Explore Hotels
        </Button>
      </Paper>
    </Container>
  );
}

export default App;
