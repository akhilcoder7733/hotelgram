import { useState } from "react";
import { styled } from "@mui/system";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";

/* ----------------------------------
   Layout
----------------------------------- */

const FooterRoot = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(10),
  paddingTop: theme.spacing(8),
  background:
    theme.palette.mode === "dark"
      ? "linear-gradient(180deg, rgba(15,23,42,0.9), rgba(2,6,23,1))"
      : "linear-gradient(180deg, rgba(241,245,249,1), rgba(226,232,240,1))",
}));

const Container = styled(Box)(({ theme }) => ({
  maxWidth: 1200,
  margin: "0 auto",
  padding: theme.spacing(0, 2),
}));

/* ----------------------------------
   Subscription
----------------------------------- */

const SubscribeCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(5),
  borderRadius: 28,
  background: theme.custom.glassBg,
  backdropFilter: "blur(18px)",
  border: `1px solid ${theme.custom.glassBorder}`,
  boxShadow: theme.custom.glassShadow,
  marginBottom: theme.spacing(8),

  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 24,

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
  },
}));

const SubscribeInput = styled(TextField)(({ theme }) => ({
  minWidth: 280,

  "& .MuiOutlinedInput-root": {
    borderRadius: 999,
    background:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.06)"
        : "rgba(0,0,0,0.04)",
  },
}));

/* ----------------------------------
   Footer Grid
----------------------------------- */

const FooterGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1.4fr 1fr 1fr",
  gap: 40,

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gap: 28,
    textAlign: "center",
  },
}));

const FooterColumn = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 12,

  [theme.breakpoints.down("md")]: {
    alignItems: "center",
  },
}));

const FooterLink = styled(Typography)(({ theme }) => ({
  cursor: "pointer",
  color: theme.palette.text.secondary,
  transition: "color 0.25s ease",

  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

/* ----------------------------------
   Bottom Bar
----------------------------------- */

const BottomBar = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(6),
  padding: theme.spacing(3, 0),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

/* ----------------------------------
   Component
----------------------------------- */

const Footer = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubscribe = () => {
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    setLoading(true);

    // Fake async request
    setTimeout(() => {
      setLoading(false);
      setEmail("");

      setSnackbar({
        open: true,
        message: "Subscribed successfully! 🎉",
        severity: "success",
      });
    }, 1200);
  };

  return (
    <>
      <FooterRoot>
        <Container>
          {/* Subscribe */}
          <SubscribeCard>
            <Box>
              <Typography fontWeight={900} fontSize="1.6rem">
                Stay in the loop ✨
              </Typography>
              <Typography color="text.secondary" mt={1}>
                Get updates on new features, UI improvements, and experiments.
              </Typography>
            </Box>

            <Box
              display="flex"
              gap={2}
              flexWrap="wrap"
              sx={{
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <SubscribeInput
                size="small"
                placeholder="Enter your email"
                value={email}
                error={!!error}
                helperText={error}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
              />

              <Button
                variant="contained"
                sx={{ borderRadius: 999, px: 4 }}
                disabled={loading}
                onClick={handleSubscribe}
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </Button>
            </Box>
          </SubscribeCard>

          {/* Footer content */}
          <FooterGrid>
            <FooterColumn>
              <Typography fontWeight={900} fontSize="1.4rem">
                Hotel<span style={{ color: "#4da3ff" }}>gram</span>
              </Typography>
              <Typography color="text.secondary">
                A modern hotel booking UI crafted to showcase real-world React
                architecture, premium UX, and clean frontend engineering.
              </Typography>
            </FooterColumn>

            <FooterColumn>
              <Typography fontWeight={700}>Explore</Typography>
              <FooterLink>Home</FooterLink>
              <FooterLink>Bookings</FooterLink>
              <FooterLink>Services</FooterLink>
              <FooterLink>Profile</FooterLink>
            </FooterColumn>

            <FooterColumn>
              <Typography fontWeight={700}>Project</Typography>
              <FooterLink>About</FooterLink>
              <FooterLink>Design System</FooterLink>
              <FooterLink>Tech Stack</FooterLink>
              <FooterLink>GitHub</FooterLink>
            </FooterColumn>
          </FooterGrid>

          <Divider sx={{ mt: 6, opacity: 0.2 }} />

          <BottomBar>
            © {new Date().getFullYear()} Hotelgram — Crafted with passion by
            you.
          </BottomBar>
        </Container>
      </FooterRoot>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          sx={{ borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Footer;
