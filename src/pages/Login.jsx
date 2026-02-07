import { styled } from "@mui/system";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

/* -----------------------
   Validation Schema
------------------------ */

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

/* -----------------------
   Styled Components
------------------------ */

const PageRoot = styled(Box)(({ theme }) => ({
  minHeight: "90vh",
  display: "flex",
  background: theme.palette.background.default,

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

const ImageSection = styled(Box)(({ theme }) => ({
  flex: 1,
  position: "relative",
  backgroundImage: `url(/assets/normal/login.jpg)`,
  backgroundSize: "cover",
  backgroundPosition: "center",

  display: "flex",
  alignItems: "flex-end",
  padding: 40,

  "&::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    background:
      theme.palette.mode === "dark"
        ? "linear-gradient(180deg, rgba(11,15,26,0.15), rgba(11,15,26,0.85))"
        : "linear-gradient(180deg, rgba(255,255,255,0.15), rgba(255,255,255,0.85))",
  },

  [theme.breakpoints.down("md")]: {
    minHeight: 260,
    padding: 24,
  },
}));

const ImageContent = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 1,
  color: theme.palette.text.primary,
}));

const FormSection = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 48,

  [theme.breakpoints.down("sm")]: {
    padding: 24,
    marginTop: -80, // float over image on mobile
  },
}));

const GlassCard = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: 420,
  padding: 32,
  borderRadius: 24,

  background:
    theme.palette.mode === "dark"
      ? "rgba(18,25,45,0.9)"
      : "rgba(255,255,255,0.9)",
  backdropFilter: "blur(18px)",

  border: "1px solid rgba(255,255,255,0.12)",

  boxShadow:
    theme.palette.mode === "dark"
      ? "0 0 0 1px rgba(77,163,255,0.15), 0 0 32px rgba(77,163,255,0.35)"
      : "0 0 0 1px rgba(37,99,235,0.15), 0 12px 32px rgba(37,99,235,0.25)",

  [theme.breakpoints.down("sm")]: {
    padding: 24,
  },
}));

const Title = styled(Typography)(() => ({
  fontWeight: 700,
  marginBottom: 8,
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: 24,
}));

const SubmitButton = styled(Button)(() => ({
  height: 48,
  borderRadius: 14,
  marginTop: 16,
}));

/* -----------------------
   Component
------------------------ */

const Login = () => {
  const { login, authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/home";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await login(data);
      navigate(from, { replace: true });
    } catch {
      // handled by context
    }
  };

  return (
    <PageRoot>
      {/* IMAGE / BRAND SECTION */}
      <ImageSection>
        <ImageContent>
          <Typography variant="h4" fontWeight={800}>
            Hotelgram
          </Typography>
          <Typography color="text.secondary">
            Premium stays. Seamless booking.
          </Typography>
        </ImageContent>
      </ImageSection>

      {/* FORM SECTION */}
      <FormSection>
        <GlassCard>
          <Title variant="h5">Welcome back</Title>
          <Subtitle>Login to continue booking premium stays</Subtitle>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <SubmitButton
              type="submit"
              variant="contained"
              fullWidth
              disabled={authLoading}
            >
              {authLoading ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                "Login"
              )}
            </SubmitButton>
          </form>

          <Typography
            variant="caption"
            sx={{ mt: 2, display: "block", color: "text.secondary" }}
          >
            Demo credentials:
            <br />
            demo@hotelgram.com / hotel123
          </Typography>
        </GlassCard>
      </FormSection>
    </PageRoot>
  );
};

export default Login;
