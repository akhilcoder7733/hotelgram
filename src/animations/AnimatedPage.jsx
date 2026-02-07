import { motion } from "framer-motion";
import { pageVariants, pageTransition } from "./pageTransitions";

const AnimatedPage = ({ children }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      style={{ height: "100%" }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
