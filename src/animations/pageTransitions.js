export const splashVariants = {
  initial: {
    opacity: 0,
    scale: 0.96,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 1.04,
    transition: {
      duration: 0.6,
      ease: "easeIn",
    },
  },
};

export const pageVariants = {
  initial: {
    opacity: 0,
    y: 12,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -12,
  },
};

export const pageTransition = {
  duration: 0.35,
  ease: [0.22, 1, 0.36, 1], // smooth, native-feel curve
};

