import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("hotelgram_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async ({ email }) => {
    setAuthLoading(true);

    return new Promise((resolve) => {
      setTimeout(() => {
        const fakeUser = {
          id: `u_${Date.now()}`,
          name: email.split("@")[0],
          email,
        };

        sessionStorage.setItem(
          "hotelgram_user",
          JSON.stringify(fakeUser)
        );

        setUser(fakeUser);
        setAuthLoading(false);
        resolve(fakeUser);
      }, 1200);
    });
  };

  const logout = () => {
    sessionStorage.removeItem("hotelgram_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        loading,
        authLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
