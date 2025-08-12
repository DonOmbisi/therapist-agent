"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SecurePaymentButtonProps {
  amount: string;
  onPayment: () => Promise<void>;
}

export function SecurePaymentButton({ amount, onPayment }: SecurePaymentButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      await onPayment();
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={isProcessing}
      className="w-full"
    >
      {isProcessing ? 'Processing...' : `Pay ${amount}`}
    </Button>
  );
}
