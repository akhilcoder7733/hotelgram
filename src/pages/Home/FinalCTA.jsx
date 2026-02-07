import { styled } from "@mui/system";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Wrapper = styled(Box)(({ theme }) => ({
  maxWidth: 1200,
  margin: "0 auto",
}));

const NeonCTA = styled(Box)(({ theme }) => ({
  padding: 72,
  borderRadius: 36,
  textAlign: "center",

  background:
    "linear-gradient(135deg, rgba(0,245,255,0.15), rgba(0,120,255,0.15))",
  border: "1px solid rgba(0,245,255,0.35)",

  [theme.breakpoints.down("sm")]: {
    padding: 48,
  },
}));

const FinalCTA = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <NeonCTA>
        <Typography variant="h3" fontWeight={900}>
          Ready to book your next stay?
        </Typography>

        <Typography color="text.secondary" mt={2}>
          Sign in and explore premium hotels curated just for you.
        </Typography>

        <Button
          variant="contained"
          size="large"
          sx={{ mt: 4, borderRadius: 16, px: 6 }}
          onClick={() => navigate("/booking")}
        >
          Start Booking
        </Button>
      </NeonCTA>
    </Wrapper>
  );
};

export default FinalCTA;
