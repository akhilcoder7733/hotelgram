import { styled } from "@mui/system";
import { Box, Typography } from "@mui/material";

/* ----------------------------------
   Layout
----------------------------------- */

const Wrapper = styled(Box)(({ theme }) => ({
  maxWidth: 1100,
  margin: "0 auto",
  // padding: theme.spacing(8, 0),
  backgroundColor: "red",
  borderRadius: 32,
}));

const GlassSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6),
  borderRadius: 32,
  background: theme.custom.glassBg,
  backdropFilter: "blur(18px)",
  border: `1px solid ${theme.custom.glassBorder}`,
  boxShadow: theme.custom.glassShadow,

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(4),
  },
}));

/* ----------------------------------
   Creator Section
----------------------------------- */

const CreatorGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1.1fr 0.9fr",
  gap: 40,
  marginTop: theme.spacing(6),

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gap: 28,
  },
}));

/* ----------------------------------
   Image Composition
----------------------------------- */

const ImageStage = styled(Box)(({ theme }) => ({
  position: "relative",
  height: 520,

  [theme.breakpoints.down("md")]: {
    height: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
}));

const MainImage = styled(Box)(({ theme }) => ({
  position: "absolute",
  right: 0,
  top: 0,
  width: "68%",
  height: "100%",
  borderRadius: 28,
  overflow: "hidden",
  border: `1px solid ${theme.custom.glassBorder}`,
  background: theme.custom.glassBg,

  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  boxShadow:
    theme.palette.mode === "dark"
      ? theme.custom.neonShadowDark
      : theme.custom.neonShadowLight,

  [theme.breakpoints.down("md")]: {
    position: "relative",
    width: "100%",
    height: 360,
  },
}));

const FloatingImage = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: 0,
  bottom: -40,
  width: "42%",
  height: 260,
  borderRadius: 24,
  overflow: "hidden",
  border: `1px solid ${theme.custom.glassBorder}`,
  background: theme.custom.glassBg,

  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  backdropFilter: "blur(10px)",
  boxShadow:
    theme.palette.mode === "dark"
      ? theme.custom.neonShadowDark
      : theme.custom.neonShadowLight,

  [theme.breakpoints.down("md")]: {
    position: "relative",
    width: "100%",
    height: 280,
    bottom: 0,
  },
}));

/* ----------------------------------
   Component
----------------------------------- */

const About = () => {
  return (
    <Wrapper>
      <GlassSection>
        {/* Header */}
        <Typography
          variant="h4"
          fontWeight={900}
          textAlign="center"
          sx={{ letterSpacing: "0.04em" }}
        >
          About <span style={{ color: "#4da3ff" }}>Hotelgram</span>
        </Typography>

        {/* Product Story */}
        <Typography
          color="text.secondary"
          mt={3}
          sx={{
            fontSize: "1.05rem",
            maxWidth: 760,
            mx: "auto",
            textAlign: "center",
            lineHeight: 1.7,
          }}
        >
          Hotelgram is a frontend-first hotel booking experience crafted to
          simulate real-world product behavior — from protected routes and
          booking flows to premium UI animations and glassmorphism design.
          <br />
          <br />
          This project focuses on **clean architecture, thoughtful UX, and
          modern React patterns**, built without a backend to emphasize frontend
          mastery.
        </Typography>

        {/* Creator */}
        <CreatorGrid>
          {/* Text */}
          <Box>
            <Typography fontWeight={800} fontSize="1.6rem">
              Built by a Frontend Engineer
            </Typography>

            <Typography mt={2} color="text.secondary" sx={{ lineHeight: 1.7 }}>
              Hotelgram was designed and developed as a learning-focused,
              production-inspired project to explore how modern booking
              platforms are structured and styled.
              <br />
              <br />
              From React 18 and Context-based state management to Material UI
              theming and micro-interactions, every detail was intentionally
              crafted to reflect real-world standards.
            </Typography>

            <Typography
              mt={3}
              fontWeight={700}
              sx={{
                color: "primary.main",
                letterSpacing: "0.05em",
              }}
            >
              — Crafted with passion, precision, and curiosity ✨
            </Typography>
          </Box>

          {/* Images */}
          {/* Images */}
          <ImageStage>
            <MainImage>
              <img src="/assets/me/me1.jpg" alt="Creator portrait" />
            </MainImage>

            <FloatingImage>
              <img src="/assets/me/me2.png" alt="Creator working" />
            </FloatingImage>
          </ImageStage>
        </CreatorGrid>
      </GlassSection>
    </Wrapper>
  );
};

export default About;
