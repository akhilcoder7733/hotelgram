import { styled } from "@mui/system";
import {
  Box,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

/* --------------------------------
   Base Layout
--------------------------------- */

const PageRoot = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  padding: "120px 24px 64px",
  display: "flex",
  flexDirection: "column",
  gap: 96,
  background: theme.palette.background.default,

  [theme.breakpoints.down("sm")]: {
    padding: "96px 16px 48px",
    gap: 72,
  },
}));

const Container = styled(Box)(() => ({
  width: "100%",
  maxWidth: 1200,
  margin: "0 auto",
}));

const GlassSection = styled(Box)(({ theme }) => ({
  background: "rgba(255,255,255,0.06)",
  backdropFilter: "blur(16px)",
  borderRadius: 28,
  border: "1px solid rgba(255,255,255,0.08)",
  padding: 48,

  [theme.breakpoints.down("sm")]: {
    padding: 32,
  },
}));

/* --------------------------------
   Hero Section
--------------------------------- */

const HeroTitle = styled(Typography)(() => ({
  fontWeight: 800,
  lineHeight: 1.1,
  letterSpacing: "-0.02em",
}));

const HeroSubtext = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  maxWidth: 620,
}));

const CTAGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: 16,
  marginTop: 24,

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const PrimaryCTA = styled(Button)(() => ({
  height: 52,
  borderRadius: 16,
  padding: "0 28px",
  fontWeight: 600,
}));

const SecondaryCTA = styled(Button)(() => ({
  height: 52,
  borderRadius: 16,
  padding: "0 28px",
}));

/* --------------------------------
   Highlights
--------------------------------- */

const HighlightsGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 24,

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
  },
}));

const HighlightCard = styled(Box)(({ theme }) => ({
  padding: 32,
  borderRadius: 20,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
}));

/* --------------------------------
   Features
--------------------------------- */

const FeatureGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 32,

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
  },
}));

const FeatureItem = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 12,
}));

/* --------------------------------
   CTA Banner
--------------------------------- */

const CTASection = styled(Box)(({ theme }) => ({
  padding: 64,
  borderRadius: 32,
  background:
    "linear-gradient(135deg, rgba(0,245,255,0.15), rgba(0,120,255,0.15))",
  border: "1px solid rgba(0,245,255,0.3)",
  textAlign: "center",

  [theme.breakpoints.down("sm")]: {
    padding: 40,
  },
}));

/* --------------------------------
   Component
--------------------------------- */

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleBookingClick = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/booking" } });
    } else {
      navigate("/booking");
    }
  };

  return (
    <PageRoot>
      {/* HERO */}
      <Container>
        <GlassSection>
          <HeroTitle variant="h3">
            Book premium stays,
            <br />
            without the hassle
          </HeroTitle>

          <HeroSubtext variant="body1" mt={2}>
            Discover hand-picked hotels, seamless booking,
            and exclusive offers — all in one elegant experience.
          </HeroSubtext>

          <CTAGroup>
            <PrimaryCTA variant="contained" onClick={handleBookingClick}>
              Explore Hotels
            </PrimaryCTA>

            <SecondaryCTA
              variant="outlined"
              onClick={() => navigate("/profile")}
            >
              View Profile
            </SecondaryCTA>
          </CTAGroup>
        </GlassSection>
      </Container>

      {/* HIGHLIGHTS */}
      <Container>
        <HighlightsGrid>
          {[
            ["500+", "Premium Hotels"],
            ["50+", "Top Cities"],
            ["24/7", "Support"],
          ].map(([value, label]) => (
            <HighlightCard key={label}>
              <Typography variant="h4" fontWeight={700}>
                {value}
              </Typography>
              <Typography color="text.secondary">
                {label}
              </Typography>
            </HighlightCard>
          ))}
        </HighlightsGrid>
      </Container>

      {/* FEATURES */}
      <Container>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Why Hotelgram?
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <FeatureGrid>
          <FeatureItem>
            <Typography fontWeight={600}>
              Curated Stays
            </Typography>
            <Typography color="text.secondary">
              Every hotel is carefully selected for quality,
              comfort, and experience.
            </Typography>
          </FeatureItem>

          <FeatureItem>
            <Typography fontWeight={600}>
              Secure Booking
            </Typography>
            <Typography color="text.secondary">
              Auth-guarded flows with smooth,
              predictable booking UX.
            </Typography>
          </FeatureItem>

          <FeatureItem>
            <Typography fontWeight={600}>
              Modern Experience
            </Typography>
            <Typography color="text.secondary">
              Built with React + MUI for speed,
              accessibility, and elegance.
            </Typography>
          </FeatureItem>
        </FeatureGrid>
      </Container>

      {/* FINAL CTA */}
      <Container>
        <CTASection>
          <Typography variant="h4" fontWeight={800}>
            Ready to plan your next stay?
          </Typography>

          <Typography color="text.secondary" mt={2}>
            Sign in and explore premium hotels curated just for you.
          </Typography>

          <Button
            variant="contained"
            size="large"
            sx={{ mt: 4, borderRadius: 16, px: 6 }}
            onClick={handleBookingClick}
          >
            Start Booking
          </Button>
        </CTASection>
      </Container>
    </PageRoot>
  );
};

export default Home;
