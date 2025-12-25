"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

type User = {
  email: string;
  name: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("vaidya_connect_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem("vaidya_connect_user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // In a real app, this would call an API
    // For now, we'll use localStorage for demo purposes
    const storedUsers = JSON.parse(localStorage.getItem("vaidya_connect_users") || "[]");
    const user = storedUsers.find(
      (u: User & { password: string }) => u.email === email && u.password === password
    );

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const userData = { email: user.email, name: user.name };
    setUser(userData);
    localStorage.setItem("vaidya_connect_user", JSON.stringify(userData));
  };

  const signup = async (email: string, password: string, name: string) => {
    // In a real app, this would call an API
    const storedUsers = JSON.parse(localStorage.getItem("vaidya_users") || "[]");
    
    if (storedUsers.find((u: User & { password: string }) => u.email === email)) {
      throw new Error("Email already registered");
    }

    const newUser = { email, password, name };
    storedUsers.push(newUser);
    localStorage.setItem("vaidya_connect_users", JSON.stringify(storedUsers));

    const userData = { email, name };
    setUser(userData);
    localStorage.setItem("vaidya_connect_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("vaidya_user");
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

