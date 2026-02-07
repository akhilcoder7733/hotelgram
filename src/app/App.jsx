import { useLocation } from "react-router-dom";
import Header from "../components/layout/Header";
import Router from "./router";
import ScrollRestorationManager from "./ScrollRestorationManager";
import RouteTitleManager from "./RouteTitleManager";
import Footer from "../components/layout/Footer";
import ScrollToTopButton from "../components/common/ScrollToTopButton";

const App = () => {
  const location = useLocation();
  const isSplash = location.pathname === "/";

  return (
    <>
      <ScrollRestorationManager />
      <RouteTitleManager />

      {!isSplash && <Header />}
      <Router />
      {!isSplash && <Footer />}
      {!isSplash && <ScrollToTopButton />}
    </>
  );
};


export default App;
