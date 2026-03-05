"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Brain } from "lucide-react";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/lib/contexts/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Container className="max-w-md">
        <Card className="p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center">
              <Brain className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold">Welcome to AI Therapist</h1>
            <p className="text-muted-foreground">
              Sign in to start your wellness journey
            </p>
          </div>

          <Button
            className="w-full"
            size="lg"
            onClick={async () => {
              await login();
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Connecting...
              </>
            ) : (
              "Get Started"
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </Card>
      </Container>
    </div>
  );
}
