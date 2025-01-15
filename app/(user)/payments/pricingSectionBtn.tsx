"use client";
import { Button } from "@/components/ui/button";
import { ReactNode, useState } from "react";
import { getStripe } from "@/lib/stripe-client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  price: string;
  children?: ReactNode;
  isPopular: boolean;
}

export const SubscribeBtn = ({ price, isPopular }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  type CheckoutSessionResponse = {
    sessionId: string;
  };

  const handleCheckout = async (price: string) => {
    setLoading(true);
    
    if (!price) {
      router.push('/dashboard');
      return;
    }

    try {
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
      
      const stripe = await getStripe();
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
    <Button 
      onClick={() => handleCheckout(price)} 
      className={`w-full ${
        isPopular 
          ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
          : 'bg-gray-100 text-indigo-700 hover:bg-gray-200 dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600'
      }`} 
      disabled={loading}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </>
      ) : (
        !price ? 'Get Started' : 'Subscribe Now'
      )}
    </Button>
  );
};