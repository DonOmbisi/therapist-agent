"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

export function CommunityPool() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Community Pool
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Pool Balance</span>
            <span className="font-bold">0 USDC</span>
          </div>
          <Button className="w-full">
            Join Pool
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
