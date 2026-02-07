import { styled } from "@mui/system";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Wrapper = styled(Box)(({ theme }) => ({
  maxWidth: 1200,
  margin: "0 auto",
}));

const GlassHero = styled(Box)(({ theme }) => ({
  position: "relative",
  padding: "72px 64px",
  borderRadius: 32,

  background: theme.custom.glassBg,
  backdropFilter: "blur(20px)",
  border: "1px solid transparent",

  boxShadow:
    theme.palette.mode === "dark"
      ? theme.custom.neonShadowDark
      : theme.custom.neonShadowLight,

  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    padding: 1,
    borderRadius: 32,
    background: theme.custom.neonBorder,
    WebkitMask:
      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    WebkitMaskComposite: "xor",
    pointerEvents: "none",
  },

  [theme.breakpoints.down("md")]: {
    padding: "56px 40px",
  },

  [theme.breakpoints.down("sm")]: {
    padding: "40px 24px",
  },
}));

const Title = styled(Typography)(() => ({
  fontWeight: 900,
  lineHeight: 1.05,
  letterSpacing: "-0.03em",
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  marginTop: 16,
  maxWidth: 640,
  color: theme.palette.text.secondary,
}));

const CTAGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: 16,
  marginTop: 32,

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const PrimaryCTA = styled(Button)(() => ({
  height: 52,
  borderRadius: 16,
  padding: "0 32px",
  fontWeight: 700,
}));

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <GlassHero>
        <Title variant="h2">
          Premium stays,
          <br />
          re-imagined
        </Title>

        <Subtitle>
          Discover curated hotels, seamless booking, and a modern
          experience designed for comfort and clarity.
        </Subtitle>

        <CTAGroup>
          <PrimaryCTA
            variant="contained"
            onClick={() => navigate("/booking")}
          >
            Explore Hotels
          </PrimaryCTA>

          <Button
            variant="outlined"
            sx={{ borderRadius: 16, px: 4 }}
            onClick={() => navigate("/profile")}
          >
            View Profile
          </Button>
        </CTAGroup>
      </GlassHero>
    </Wrapper>
  );
};

export default HeroSection;
