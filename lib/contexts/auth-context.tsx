"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: {
    id?: string;
    name?: string;
    email?: string;
    walletAddress?: string;
  } | null;
  showLoginModal: boolean;
  showUserForm: boolean;
}

interface AuthContextType extends AuthState {
  login: () => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<AuthState["user"]>) => Promise<void>;
  setShowLoginModal: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    isLoading: false,
    isAuthenticated: false,
    user: null,
    showLoginModal: false,
    showUserForm: false,
  });

  // Simple mock authentication for development
  const login = async () => {
    setState((s) => ({ ...s, isLoading: true }));
    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setState((s) => ({
      ...s,
      isAuthenticated: true,
      user: {
        id: 'user-1',
        name: 'Demo User',
        email: 'demo@example.com',
      },
      isLoading: false,
    }));
  };

  const logout = async () => {
    setState((s) => ({
      ...s,
      isAuthenticated: false,
      user: null,
    }));
  };

  const updateUser = async (data: Partial<AuthState["user"]>) => {
    setState((s) => ({
      ...s,
      user: s.user ? { ...s.user, ...data } : data,
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        updateUser,
        setShowLoginModal: (show) =>
          setState((s) => ({ ...s, showLoginModal: show })),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
