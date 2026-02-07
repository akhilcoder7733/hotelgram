import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const scrollPositions = new Map();

const ScrollRestorationManager = () => {
  const location = useLocation();
  const navigationType = useNavigationType(); // POP | PUSH | REPLACE
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    // Save scroll position of previous page
    scrollPositions.set(prevPath.current, window.scrollY);

    // Restore or reset scroll
    if (navigationType === "POP") {
      const y = scrollPositions.get(location.pathname) ?? 0;
      window.scrollTo({ top: y, behavior: "auto" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    prevPath.current = location.pathname;
  }, [location, navigationType]);

  return null;
};

export default ScrollRestorationManager;
