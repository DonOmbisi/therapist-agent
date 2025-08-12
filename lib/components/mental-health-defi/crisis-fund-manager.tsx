"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

export function CrisisFundManager() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Crisis Fund
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Emergency Reserve</span>
            <span className="font-bold">0 ETH</span>
          </div>
          <Button className="w-full">
            Contribute to Fund
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
