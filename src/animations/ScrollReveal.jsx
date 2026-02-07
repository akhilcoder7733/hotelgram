import { motion } from "framer-motion";
import {
  revealVariants,
  revealTransition,
} from "./scrollVariants";

const ScrollReveal = ({ children, delay = 0 }) => {
  return (
    <motion.div
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ ...revealTransition, delay }}
      style={{ width: "100%" }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
