import { useEffect, useRef, useState } from "react";
import { styled } from "@mui/system";
import { Box, Typography, useTheme } from "@mui/material";
import HotelIcon from "@mui/icons-material/Hotel";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

/* ----------------------------------
   Layout
----------------------------------- */

const Wrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 2),
}));

const Grid = styled(Box)(({ theme }) => ({
  maxWidth: 1200,
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 28,

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gap: 20,
  },
}));

/* ----------------------------------
   Card
----------------------------------- */

const Card = styled(Box)(({ theme }) => ({
  position: "relative",
  padding: "42px 28px",
  borderRadius: 28,
  overflow: "hidden",

  background: theme.custom.glassBg,
  backdropFilter: "blur(18px)",
  border: `1px solid ${theme.custom.glassBorder}`,

  textAlign: "center",

  transition: "all 0.35s ease",

  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    borderRadius: 28,
    opacity: 0,
    transition: "opacity 0.35s ease",
    boxShadow:
      theme.palette.mode === "dark"
        ? theme.custom.neonShadowDark
        : theme.custom.neonShadowLight,
  },

  "&:hover": {
    transform: "translateY(-10px)",

    "&::before": {
      opacity: 1,
    },
  },
}));

/* ----------------------------------
   Icon Watermark
----------------------------------- */

const WatermarkIcon = styled(Box)(({ theme }) => ({
  position: "absolute",
  right: -10,
  bottom: -10,
  fontSize: 140,
  opacity: theme.palette.mode === "dark" ? 0.06 : 0.08,
  color: theme.palette.text.primary,
  pointerEvents: "none",

  [theme.breakpoints.down("sm")]: {
    fontSize: 120,
  },
}));

/* ----------------------------------
   Count Animation Hook (controlled)
----------------------------------- */

const useCountUp = (target, start, duration = 900) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setValue(Math.floor(progress * target));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [start, target, duration]);

  return value;
};

/* ----------------------------------
   Highlight Card
----------------------------------- */

const HighlightCard = ({ value, suffix, label, icon }) => {
  const theme = useTheme();
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  const count = useCountUp(value, visible);

  /* Intersection Observer */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.45 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Card ref={ref}>
      <WatermarkIcon>{icon}</WatermarkIcon>

      <Typography
        fontWeight={900}
        sx={{
          fontSize: { xs: "2.4rem", md: "3rem" },
          lineHeight: 1.1,
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, #4da3ff, #22d3ee)"
              : "linear-gradient(135deg, #2563eb, #38bdf8)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {count}
        {suffix}
      </Typography>

      <Typography
        mt={1}
        fontWeight={600}
        color="text.secondary"
        sx={{ letterSpacing: "0.04em" }}
      >
        {label}
      </Typography>
    </Card>
  );
};

/* ----------------------------------
   Section
----------------------------------- */

const Highlights = () => {
  return (
    <Wrapper>
      <Grid>
        <HighlightCard
          value={500}
          suffix="+"
          label="Premium Hotels"
          icon={<HotelIcon fontSize="inherit" />}
        />
        <HighlightCard
          value={50}
          suffix="+"
          label="Top Cities"
          icon={<LocationCityIcon fontSize="inherit" />}
        />
        <HighlightCard
          value={24}
          suffix="/7"
          label="Customer Support"
          icon={<SupportAgentIcon fontSize="inherit" />}
        />
      </Grid>
    </Wrapper>
  );
};

export default Highlights;
