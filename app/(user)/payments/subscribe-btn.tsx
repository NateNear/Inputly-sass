"use client";
import { Button } from "@/components/ui/button";
import { ReactNode, useState } from "react";
import { getStripe } from "@/lib/stripe-client";
import { Loader2 } from "lucide-react";

type Props = {
  price: string;
  children?: ReactNode;
}

export const SubscribeBtn = ({ price }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  type CheckoutSessionResponse = {
    sessionId: string;
  };
  
  const handleCheckout = async (price: string) => {
    setLoading(true);
    try {
      console.log("price", { price });
      
      const response = await fetch("/api/stripe/checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }
  
      const { sessionId }: CheckoutSessionResponse = await response.json();
      console.log("sessionID", { sessionId });
  
      const stripe = await getStripe();
      console.log("stripe Id", stripe);
      if (stripe) {
        stripe.redirectToCheckout({ sessionId });
      }
    } catch (error) {
      console.error(error);
      setError("Failed to initiate checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  if (error) {
    return <p>{error}</p>
  }

  return (
    <Button onClick={() => handleCheckout(price)} className="bg-indigo-700" disabled={loading}>{loading ? <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please Wait</> : "Subscribe"}</Button>
  )
}

