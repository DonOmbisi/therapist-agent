"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { AuthProvider } from "@/lib/contexts/auth-context";
import { ThemeProvider } from "@/components/theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
  
  // If Privy App ID is not configured, render without Privy provider
  if (!privyAppId || privyAppId === "your_privy_app_id_here") {
    console.warn("Privy App ID not configured. Wallet authentication will be disabled.");
    return (
      <AuthProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </AuthProvider>
    );
  }

  return (
    <PrivyProvider
      appId={privyAppId}
      config={{
        loginMethods: ["wallet"],
        appearance: {
          theme: "dark",
          accentColor: "#674188",
          showWalletLoginFirst: true,
        },
      }}
    >
      <AuthProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </AuthProvider>
    </PrivyProvider>
  );
}
