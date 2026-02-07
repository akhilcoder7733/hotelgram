import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeModeProvider } from "./theme/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { BookingProvider } from "./contexts/BookingContext";
import { PaymentProvider } from "./contexts/PaymentContext";
import { ConfirmProvider } from "./contexts/ConfirmContext";
import { BookingConfirmProvider } from "./contexts/BookingConfirmContext";
import App from "./app/App";
import "@fontsource/inter";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ThemeModeProvider>
      <AuthProvider>
        <BookingProvider>
          <PaymentProvider>
            <ConfirmProvider>
<BookingConfirmProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </BookingConfirmProvider>
            </ConfirmProvider>
          </PaymentProvider>
        </BookingProvider>
      </AuthProvider>
    </ThemeModeProvider>
  </React.StrictMode>
);
