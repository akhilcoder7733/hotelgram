import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { styled } from "@mui/system";

/* ---------------- Styled Components ---------------- */

const SplashWrapper = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: `
    radial-gradient(
      circle at center,
      rgba(0, 255, 255, 0.08),
      transparent 60%
    ),
    ${theme.palette.background.default}
  `,
  overflow: "hidden",
}));

const BrandText = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  letterSpacing: "0.12em",
  background: "linear-gradient(90deg, #4dd0e1, #00e5ff)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textShadow: "0 0 30px rgba(0, 229, 255, 0.35)",
}));

const Tagline = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  color: theme.palette.text.secondary,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
}));

/* ---------------- Motion Variants ---------------- */

const containerVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    filter: "blur(6px)",
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

const logoVariants = {
  initial: {
    opacity: 0,
    scale: 0.85,
    y: 20,
    filter: "blur(8px)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: "easeOut",
    },
  },
};

const taglineVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

/* ---------------- Component ---------------- */

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home", { replace: true });
    }, 1800);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <SplashWrapper
      component={motion.div}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Box textAlign="center">
        <BrandText
          component={motion.h1}
          variants={logoVariants}
          variant="h2"
        >
          Hotelgram
        </BrandText>

        <Tagline
          component={motion.p}
          variants={taglineVariants}
          variant="body2"
        >
          Book. Relax. Repeat.
        </Tagline>
      </Box>
    </SplashWrapper>
  );
};

export default Splash;
