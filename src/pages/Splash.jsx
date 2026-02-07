import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { splashVariants } from "../animations/pageTransitions";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home", { replace: true });
    }, 1800);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box
      component={motion.div}
      variants={splashVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "background.default",
      }}
    >
      <Typography variant="h3" fontWeight={700}>
        Hotelgram.com
      </Typography>
    </Box>
  );
};

export default Splash;
