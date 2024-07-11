// src/components/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    return storedAuth ? JSON.parse(storedAuth) : false;
  });
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Fetch user data from server
    fetch("https://direct.afkmotorsfinans.com/get_user.php")
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
      const timeoutId = setTimeout(() => {
        setIsAuthenticated(false);
        localStorage.removeItem("isAuthenticated");
      }, 100 * 60 * 1000); // 10 minutes

      return () => clearTimeout(timeoutId);
    }
  }, [isAuthenticated]);

  const login = (email, password) => {
    if (userData) {
      const foundUser = userData.find((user) => {
        return (
          user.email === email && user.sifre === password && user.sifre !== ""
        );
      });
      if (foundUser) {
        setIsAuthenticated(true);
        setUsername(foundUser.email);
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    setUsername(""); // Clear the username on logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, username }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
