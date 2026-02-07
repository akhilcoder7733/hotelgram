import { styled } from "@mui/system";
import {
  Box,
  Typography,
  Avatar,
  Divider,
  Chip,
} from "@mui/material";

/* ----------------------------------
   Page Wrapper
----------------------------------- */

const Page = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 2),
}));

const Container = styled(Box)(({ theme }) => ({
  maxWidth: 1100,
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  gap: 40,
}));

/* ----------------------------------
   Glass Card
----------------------------------- */

const GlassCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 28,
  background: theme.custom.glassBg,
  backdropFilter: "blur(18px)",
  border: `1px solid ${theme.custom.glassBorder}`,
  boxShadow: theme.custom.glassShadow,

  transition: "all 0.35s ease",

  "&:hover": {
    transform: "translateY(-6px)",
    boxShadow:
      theme.palette.mode === "dark"
        ? theme.custom.neonShadowDark
        : theme.custom.neonShadowLight,
  },

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(3),
  },
}));

/* ----------------------------------
   Hero Section
----------------------------------- */

const Hero = styled(GlassCard)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  gap: 32,
  alignItems: "center",

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    textAlign: "center",
  },
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 140,
  height: 140,
  borderRadius: 28,
  border: `2px solid ${theme.palette.primary.main}`,
  boxShadow:
    theme.palette.mode === "dark"
      ? theme.custom.neonShadowDark
      : theme.custom.neonShadowLight,

  [theme.breakpoints.down("sm")]: {
    width: 120,
    height: 120,
    margin: "0 auto",
  },
}));

const Name = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  fontSize: "2rem",
  letterSpacing: "0.04em",
}));

const Role = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 700,
  marginTop: 6,
}));

const Bio = styled(Typography)(({ theme }) => ({
  marginTop: 16,
  color: theme.palette.text.secondary,
  lineHeight: 1.7,
}));

/* ----------------------------------
   Stats
----------------------------------- */

const StatsGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 24,

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
  },
}));

const StatCard = styled(GlassCard)(({ theme }) => ({
  textAlign: "center",
}));

const StatValue = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  fontSize: "2rem",
  background:
    theme.palette.mode === "dark"
      ? "linear-gradient(135deg, #4da3ff, #22d3ee)"
      : "linear-gradient(135deg, #2563eb, #38bdf8)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
}));

/* ----------------------------------
   Skills
----------------------------------- */

const SkillsWrapper = styled(GlassCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 16,
}));

const SkillsRow = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: 12,
  justifyContent: "flex-start",

  [theme.breakpoints.down("md")]: {
    justifyContent: "center",
  },
}));

const SkillChip = styled(Chip)(({ theme }) => ({
  padding: "8px 14px",
  fontWeight: 700,
  borderRadius: 999,
  backdropFilter: "blur(10px)",
  background:
    theme.palette.mode === "dark"
      ? "rgba(255,255,255,0.06)"
      : "rgba(0,0,0,0.05)",
  border: `1px solid ${theme.custom.glassBorder}`,

  "&:hover": {
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 0 18px rgba(77,163,255,0.45)"
        : "0 0 18px rgba(37,99,235,0.35)",
  },
}));

/* ----------------------------------
   Activity / About
----------------------------------- */

const Activity = styled(GlassCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 12,
}));

/* ----------------------------------
   Component
----------------------------------- */

const Profile = () => {
  return (
    <Page>
      <Container>
        {/* Hero */}
        <Hero>
          <ProfileAvatar src="/assets/me/me1.jpg" />
          <Box>
            <Name>Bond</Name>
            <Role>Frontend Engineer • React & UI Architect</Role>
            <Bio>
              Passionate about crafting modern, scalable, and visually refined
              web experiences. Hotelgram is a demonstration of real-world React
              architecture, premium UI systems, and UX-first thinking.
            </Bio>
          </Box>
        </Hero>

        {/* Stats */}
        <StatsGrid>
          <StatCard>
            <StatValue>10+</StatValue>
            <Typography color="text.secondary">
              UI Components Designed
            </Typography>
          </StatCard>

          <StatCard>
            <StatValue>5+</StatValue>
            <Typography color="text.secondary">
              Context-Driven Systems
            </Typography>
          </StatCard>

          <StatCard>
            <StatValue>100%</StatValue>
            <Typography color="text.secondary">
              Frontend Focused
            </Typography>
          </StatCard>
        </StatsGrid>

        {/* Skills */}
        <SkillsWrapper>
          <Typography fontWeight={800}>Core Skills</Typography>
          <SkillsRow>
            {[
              "React 18",
              "Material UI v5",
              "Context API",
              "Framer Motion",
              "Glassmorphism",
              "Responsive Design",
              "UX Architecture",
            ].map((skill) => (
              <SkillChip key={skill} label={skill} />
            ))}
          </SkillsRow>
        </SkillsWrapper>

        {/* Activity */}
        <Activity>
          <Typography fontWeight={800}>About This Demo</Typography>
          <Divider sx={{ opacity: 0.2 }} />
          <Typography color="text.secondary" lineHeight={1.7}>
            This profile page is intentionally static and handcrafted to
            simulate a real product environment. Every section demonstrates
            layout systems, responsive strategies, theme compatibility, and
            animation-ready UI components.
            <br />
            <br />
            No backend. No shortcuts. Just clean frontend engineering.
          </Typography>
        </Activity>
      </Container>
    </Page>
  );
};

export default Profile;
