import React, { createContext, useState } from "react";
import { loginUser, registerUser } from "../api/auth";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user") || "null")
  );
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = async (cred) => {
    const res = await loginUser(cred);
    setToken(res.token);
    setUser(res.user);

    localStorage.setItem("token", res.token);
    localStorage.setItem("user", JSON.stringify(res.user));
    return res;
  };

  const register = async (data) => {
    const res = await registerUser(data);
    setToken(res.token);
    setUser(res.user);

    localStorage.setItem("token", res.token);
    localStorage.setItem("user", JSON.stringify(res.user));
    return res;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}
