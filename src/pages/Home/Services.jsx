import { styled } from "@mui/system";
import { Box, Typography, Stack, Chip } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import SecurityIcon from "@mui/icons-material/Security";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DevicesIcon from "@mui/icons-material/Devices";
import { keyframes } from "@mui/system";

/* ---------------------------------- */
/* Layout Containers */
/* ---------------------------------- */

const Page = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 3),
}));

const Section = styled(Box)(({ theme }) => ({
  maxWidth: 1200,
  margin: "0 auto",
  marginBottom: theme.spacing(10),
}));

/* ---------------------------------- */
/* Grid & Cards */
/* ---------------------------------- */

const Grid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 32,

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
  },
}));

const GlassCard = styled(Box)(({ theme }) => ({
  padding: 32,
  borderRadius: 24,
  background:
    theme.palette.mode === "dark"
      ? "rgba(255,255,255,0.05)"
      : "rgba(0,0,0,0.04)",
  backdropFilter: "blur(14px)",
  border: `1px solid ${theme.palette.divider}`,

  transition: "all 0.35s ease",

  "&:hover": {
    transform: "translateY(-8px) scale(1.02)",
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 20px 45px rgba(77,163,255,0.35)"
        : "0 16px 36px rgba(37,99,235,0.25)",
  },
}));

/* ---------------------------------- */
/* Icon Wrapper */
/* ---------------------------------- */

const IconBox = styled(Box)(({ theme }) => ({
  width: 56,
  height: 56,
  borderRadius: 16,
  display: "grid",
  placeItems: "center",
  marginBottom: 16,
  background:
    theme.palette.mode === "dark"
      ? "linear-gradient(135deg, #4da3ff, #22d3ee)"
      : "linear-gradient(135deg, #2563eb, #38bdf8)",
  color: "#fff",
}));

const neonPulse = keyframes`
  0% { box-shadow: 0 0 0 rgba(77,163,255,0); }
  50% { box-shadow: 0 0 18px rgba(77,163,255,0.35); }
  100% { box-shadow: 0 0 0 rgba(77,163,255,0); }
`;

const shimmer = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
`;

const NeonChip = styled(Chip)(({ theme }) => ({
  position: "relative",
  padding: "10px 18px",
  fontWeight: 700,
  fontSize: "0.9rem",
  borderRadius: 999,

  color: theme.palette.text.primary,

  background:
    theme.palette.mode === "dark"
      ? "linear-gradient(135deg, rgba(77,163,255,0.15), rgba(34,211,238,0.15))"
      : "linear-gradient(135deg, rgba(37,99,235,0.15), rgba(56,189,248,0.15))",

  backdropFilter: "blur(12px)",
  border: `1px solid ${
    theme.palette.mode === "dark"
      ? "rgba(77,163,255,0.35)"
      : "rgba(37,99,235,0.35)"
  }`,

  animation: `${neonPulse} 4s ease-in-out infinite`,

  transition: "all 0.35s ease",

  "&::before": {
    content: '""',
    position: "absolute",
    inset: -1,
    borderRadius: 999,
    zIndex: -1,
    background:
      theme.palette.mode === "dark"
        ? "linear-gradient(90deg, #4da3ff, #22d3ee, #4da3ff)"
        : "linear-gradient(90deg, #2563eb, #38bdf8, #2563eb)",
    backgroundSize: "200% 200%",
    opacity: 0,
    transition: "opacity 0.35s ease",
    animation: `${shimmer} 3s linear infinite`,
  },

  "&:hover": {
    transform: "translateY(-4px) scale(1.05)",
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 0 24px rgba(77,163,255,0.55)"
        : "0 0 24px rgba(37,99,235,0.45)",

    "&::before": {
      opacity: 1,
    },
  },
}));

/* ---------------------------------- */
/* Services Data */
/* ---------------------------------- */

const SERVICES = [
  {
    title: "Smart Search",
    desc: "AI-inspired filtering to match hotels with your preferences instantly.",
    icon: <SearchIcon />,
  },
  {
    title: "Instant Booking",
    desc: "Zero-friction booking flow with simulated real-time availability.",
    icon: <FlashOnIcon />,
  },
  {
    title: "Secure Experience",
    desc: "Auth-guarded pages with protected actions and clean state handling.",
    icon: <SecurityIcon />,
  },
  {
    title: "24×7 Support UX",
    desc: "Designed flows that simulate real-world customer support scenarios.",
    icon: <SupportAgentIcon />,
  },
  {
    title: "Premium UI Effects",
    desc: "Glassmorphism, neon accents, and smooth micro-interactions.",
    icon: <AutoAwesomeIcon />,
  },
  {
    title: "Fully Responsive",
    desc: "Optimized layouts from mobile to ultra-wide screens.",
    icon: <DevicesIcon />,
  },
];

/* ---------------------------------- */
/* Component */
/* ---------------------------------- */

const Services = () => {

  return (
    <Page>
      {/* ---------------------------------- */}
      {/* Hero / Intro */}
      {/* ---------------------------------- */}
      <Section>
        <Stack spacing={2} textAlign="center">
          <Typography variant="h3" fontWeight={800}>
            Designed for a Modern Booking Experience
          </Typography>
          <Typography color="text.secondary" maxWidth={720} mx="auto">
            Hotelgram is crafted to simulate a real-world hotel booking platform
            with production-grade UX, clean architecture, and delightful
            animations.
          </Typography>
        </Stack>
      </Section>

      {/* ---------------------------------- */}
      {/* Core Services */}
      {/* ---------------------------------- */}
      <Section>
        <Grid>
          {SERVICES.map(({ title, desc, icon }) => (
            <GlassCard key={title}>
              <IconBox>{icon}</IconBox>
              <Typography fontWeight={700} fontSize={18}>
                {title}
              </Typography>
              <Typography color="text.secondary" mt={1}>
                {desc}
              </Typography>
            </GlassCard>
          ))}
        </Grid>
      </Section>

      {/* ---------------------------------- */}
      {/* Tech / Trust Badges */}
      {/* ---------------------------------- */}
      <Section>
        <Stack spacing={3} alignItems="center">
          <Typography fontWeight={700}>
            Built Using Modern Frontend Standards
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            flexWrap="wrap"
            justifyContent="center"
          >
            {[
              "React 18",
              "MUI v5",
              "Context API",
              "Framer Motion",
              "Glassmorphism",
              "Dark Mode First",
            ].map((label) => (
              <NeonChip key={label} label={label} />
            ))}
          </Stack>
        </Stack>
      </Section>
    </Page>
  );
};

export default Services;
