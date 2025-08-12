"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins } from "lucide-react";

export function TherapyCreditManager() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Coins className="w-5 h-5" />
          Therapy Credits
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Available Credits</span>
            <span className="font-bold">0 USDC</span>
          </div>
          <Button className="w-full">
            Add Credits
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
