import { createContext, useContext, useState } from "react";

const BookingConfirmContext = createContext(null);

export const useConfirm = () => useContext(BookingConfirmContext);

export const BookingConfirmProvider = ({ children }) => {
  const [confirmed, setConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState(null);

  const confirmBooking = () => {
    setBookingId("HG-" + Math.floor(Math.random() * 100000));
    setConfirmed(true);
  };

  const resetConfirmation = () => {
    setConfirmed(false);
    setBookingId(null);
  };

  return (
    <BookingConfirmContext.Provider
      value={{ confirmed, bookingId, confirmBooking, resetConfirmation }}
    >
      {children}
    </BookingConfirmContext.Provider>
  );
};
