import { styled } from "@mui/system";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

/* ----------------------------------
   Styled Components
----------------------------------- */

const Root = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: theme.palette.background.default,
  padding: 24,
}));

const GlassCard = styled(Box)(({ theme }) => ({
  maxWidth: 420,
  width: "100%",
  padding: "40px 32px",
  textAlign: "center",

  background: theme.custom.glassBg,
  backdropFilter: "blur(20px)",
  border: `1px solid ${theme.custom.glassBorder}`,
  borderRadius: 20,
  boxShadow: theme.custom.glassShadow,

  display: "flex",
  flexDirection: "column",
  gap: 20,

  animation: "fadeIn 0.6s ease",

  "@keyframes fadeIn": {
    from: { opacity: 0, transform: "translateY(10px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
}));

const ErrorCode = styled(Typography)(({ theme }) => ({
  fontSize: "4rem",
  fontWeight: 800,
  lineHeight: 1,
  color: theme.palette.primary.main,
}));

const Message = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const HomeButton = styled(Button)(({ theme }) => ({
  marginTop: 8,
  padding: "10px 20px",
  borderRadius: 999,
  fontWeight: 600,
}));

/* ----------------------------------
   Component
----------------------------------- */

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Root>
      <GlassCard>
        <ErrorCode>404</ErrorCode>

        <Typography variant="h6">
          Page not found
        </Typography>

        <Message variant="body2">
          The page you’re looking for doesn’t exist or was moved.
        </Message>

        <HomeButton
          variant="contained"
          onClick={() => navigate("/home")}
        >
          Go to Home
        </HomeButton>
      </GlassCard>
    </Root>
  );
};

export default NotFound;
