import { styled } from "@mui/system";
import ScrollReveal from "../../animations/ScrollReveal";

import HeroSection from "./HeroSection";
import Highlights from "./Highlights";
import Services from "./Services";
import About from "./About";
import FinalCTA from "./FinalCTA";

const PageRoot = styled("div")(({ theme }) => ({
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

const Home = () => {
  return (
    <PageRoot>
      {/* Hero: usually immediate */}
      <ScrollReveal>
        <HeroSection />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <Highlights />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <Services />
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <About />
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <FinalCTA />
      </ScrollReveal>
    </PageRoot>
  );
};

export default Home;
