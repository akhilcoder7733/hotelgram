import { styled } from "@mui/system";
import {
  Box,
  Typography,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";
import Confetti from "react-confetti";
import { useConfirm } from "../contexts/BookingConfirmContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useWindowSize } from "react-use";

/* ================= STYLES ================= */

const PageRoot = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  padding: "120px 16px 64px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
}));

const GlassCard = styled(Box)(({ theme }) => ({
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(18px)",
  borderRadius: 28,
  padding: 40,
  maxWidth: 520,
  width: "100%",
  border: "1px solid rgba(255,255,255,0.12)",
  boxShadow: "0 0 45px rgba(0,180,255,0.12)",

  [theme.breakpoints.down("sm")]: {
    padding: 28,
  },
}));

const SuccessIcon = styled(Box)(({ theme }) => ({
  width: 72,
  height: 72,
  borderRadius: "50%",
  margin: "0 auto 20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 36,
  background:
    "linear-gradient(135deg, rgba(0,245,255,0.9), rgba(0,120,255,0.9))",
  color: "#001418",
  boxShadow: "0 0 30px rgba(0,245,255,0.6)",
}));

/* ================= COMPONENT ================= */

export default function BookingConfirmation() {
  const navigate = useNavigate();
  const { confirmed, bookingId } = useConfirm();
  const [showConfetti, setShowConfetti] = useState(true);
  const { width, height } = useWindowSize();

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 4500);
    return () => clearTimeout(timer);
  }, []);

  if (!confirmed) {
    return (
      <PageRoot>
        <GlassCard>
          <Stack alignItems="center" spacing={2}>
            <CircularProgress />
            <Typography>Finalizing your booking…</Typography>
          </Stack>
        </GlassCard>
      </PageRoot>
    );
  }

  return (
    <PageRoot>
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={300}
        />
      )}

      <GlassCard>
        <SuccessIcon>✓</SuccessIcon>

        <Typography variant="h4" fontWeight={900}>
          Booking Confirmed
        </Typography>

        <Typography
          color="text.secondary"
          mt={1}
          mb={3}
          lineHeight={1.7}
        >
          Your stay is successfully booked. We’ve sent a confirmation email
          with all booking details and payment information.
        </Typography>

        <Stack spacing={1.5} mb={4}>
          <Typography variant="body2" color="text.secondary">
            Booking ID
          </Typography>
          <Typography fontWeight={700}>{bookingId}</Typography>
        </Stack>

        <Stack spacing={2}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/profile")}
            sx={{
              borderRadius: 18,
              py: 1.4,
              background:
                "linear-gradient(135deg,#00f5ff,#0077ff)",
              boxShadow: "0 0 30px rgba(0,245,255,0.55)",
            }}
          >
            View in Profile
          </Button>

          <Button
            onClick={() => navigate("/home")}
            sx={{ opacity: 0.75 }}
          >
            Back to Home
          </Button>
        </Stack>
      </GlassCard>
    </PageRoot>
  );
}
