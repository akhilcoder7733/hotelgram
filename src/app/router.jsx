import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ProtectedRoute from "../components/common/ProtectedRoute";

import Splash from "../pages/Splash";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Booking from "../pages/Booking";
import BookingDetails from "../pages/BookingDetails";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import AnimatedPage from "../animations/AnimatedPage";
import Services from "../pages/Home/Services";
import BookingProceed from "../pages/BookingProceed";
import BookingPayment from "../pages/BookingPayment";
import BookingConfirmation from "../pages/BookingConfirmation";

const withAnimation = (element) => (
  <AnimatedPage>{element}</AnimatedPage>
);

const Router = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Splash */}
        <Route path="/" element={<Splash />} />

        {/* Public */}
        <Route path="/home" element={withAnimation(<Home />)} />
        <Route path="/login" element={withAnimation(<Login />)} />
        <Route path="/services" element={withAnimation(<Services />)} />

        {/* Booking Flow */}
        <Route
          path="/booking/proceed"
          element={
            <ProtectedRoute>
              {withAnimation(<BookingProceed />)}
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking/payment"
          element={
            <ProtectedRoute>
              {withAnimation(<BookingPayment />)}
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking/confirmation"
          element={
            <ProtectedRoute>
              {withAnimation(<BookingConfirmation />)}
            </ProtectedRoute>
          }
        />

        {/* Protected */}
        <Route
          path="/booking"
          element={
            <ProtectedRoute>
              {withAnimation(<Booking />)}
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking/:id"
          element={
            <ProtectedRoute>
              {withAnimation(<BookingDetails />)}
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              {withAnimation(<Profile />)}
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={withAnimation(<NotFound />)} />
      </Routes>
    </AnimatePresence>
  );
};

export default Router;
