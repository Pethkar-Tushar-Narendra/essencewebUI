import React, { createContext, useContext, useState } from "react";

interface User {
  email: string;
  name: string;
  role: string;
}

interface MockUser extends User {
  password: string;
}

interface AuthContextType {
  user: User | null;
  originalAdmin: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  impersonate: (targetUser: User) => void;
  stopImpersonation: () => void;
}

export const mockUsers: MockUser[] = [
  {
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
    name: "Admin User",
  },
  {
    email: "user@example.com",
    password: "user123",
    role: "user",
    name: "Regular User",
  },
  {
    email: "reseller@example.com",
    password: "reseller123",
    role: "reseller",
    name: "Reseller User",
  },
  {
    email: "admin2@example.com",
    password: "admin456",
    role: "admin",
    name: "Second Admin",
  },
  {
    email: "user2@example.com",
    password: "user456",
    role: "user",
    name: "Another User",
  },
  {
    email: "reseller2@example.com",
    password: "reseller456",
    role: "reseller",
    name: "Another Reseller",
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // 'user' is the ACTIVE user (what the UI sees)
  // We start with no user logged in
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  // 'originalAdmin' stores the admin session when impersonating
  const [originalAdmin, setOriginalAdmin] = useState<User | null>(() => {
    const saved = localStorage.getItem("originalAdmin");
    return saved ? JSON.parse(saved) : null;
  });

  // Normal Login (simplified)
  const login = (email: string, password: string): boolean => {
    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  // Logout
  const logout = () => {
    setUser(null);
    setOriginalAdmin(null);
    localStorage.removeItem("user");
    localStorage.removeItem("originalAdmin");
  };

  // LOGIC: Start Impersonation
  const impersonate = (targetUser: User) => {
    setOriginalAdmin(user); // Save the current admin
    setUser(targetUser); // Switch active user to the target
    localStorage.setItem("originalAdmin", JSON.stringify(user));
    localStorage.setItem("user", JSON.stringify(targetUser));
  };

  // LOGIC: Stop Impersonation
  const stopImpersonation = () => {
    if (originalAdmin) {
      setUser(originalAdmin);
      setOriginalAdmin(null);
      localStorage.setItem("user", JSON.stringify(originalAdmin));
      localStorage.removeItem("originalAdmin");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        originalAdmin,
        login,
        logout,
        impersonate,
        stopImpersonation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
