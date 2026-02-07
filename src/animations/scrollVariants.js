export const revealVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
};

export const revealTransition = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1], // premium easing
};
