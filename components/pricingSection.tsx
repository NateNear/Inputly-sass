import React from 'react';
import { Check, X } from "lucide-react";
import { SubscribeBtn } from '@/app/(user)/payments/pricingSectionBtn';
import { monthlyPlanId, yearlyPlanId } from '@/lib/payments';
import { BlurFade } from "@/components/ui/blur-fade";

const PricingTier = ({ 
  name, 
  price, 
  description, 
  features, 
  isPopular = false,
  priceId
}: {
  name: string;
  price: string;
  description: string;
  features: Array<{ text: string; included: boolean }>;
  isPopular?: boolean;
  priceId: string;
}) => (
  <div className={`relative flex flex-col p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl ${
    isPopular ? 'border-2 border-indigo-600 scale-105' : 'border border-gray-200 dark:border-gray-700'
  }`}>
    {isPopular && (
      <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
        <div className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium">
          Most Popular
        </div>
      </div>
    )}

    <div className="mb-5">
      <h3 className="text-2xl font-bold">{name}</h3>
      <p className="text-gray-500 dark:text-gray-400 mt-2">{description}</p>
    </div>

    <div className="mb-5">
      <span className="text-4xl font-bold">{price}</span>
      {price !== 'Free' && <span className="text-gray-500">/month</span>}
    </div>

    <ul className="space-y-3 mb-8">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center gap-3">
          {feature.included ? (
            <Check className="h-5 w-5 text-green-500" />
          ) : (
            <X className="h-5 w-5 text-gray-400" />
          )}
          <span className={feature.included ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500'}>
            {feature.text}
          </span>
        </li>
      ))}
    </ul>

    <div className="mt-auto">
      
      <SubscribeBtn 
        price={priceId}
        isPopular={isPopular}
      >
        {price === 'Free' ? 'Get Started' : 'Subscribe Now'}
      </SubscribeBtn>
    </div>
  </div>
);

export const PricingSection = () => {
  return (
    <div className="py-20 px-4 dark:bg-gray-900 relative min-h-screen bg-white overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-100 rounded-full blur-[128px] opacity-60 gradient-blob-1" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-100 rounded-full blur-[128px] opacity-60 gradient-blob-2" />
            </div>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Choose the plan that&apos;s right for you
          </p>
        </div>
      
      <BlurFade delay={0.25 * 1} inView>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      <BlurFade delay={0.25 * 2} inView>
          <PricingTier
            name="Free"
            price="Free"
            description="Perfect for trying out our service"
            priceId=""
            features={[
              { text: "Up to 3 Projects", included: true },
              { text: "Basic Analytics", included: true },
              { text: "24-hour Support", included: true },
              { text: "Custom Domain", included: false },
              { text: "Advanced Analytics", included: false },
              { text: "Priority Support", included: false },
            ]}
          />
        </BlurFade>
        <BlurFade delay={0.25 * 2.5} inView>
          <PricingTier
            name="Pro"
            price="₹100"
            description="Great for professionals"
            isPopular={true}
            priceId={monthlyPlanId}
            features={[
              { text: "Up to 10 Projects", included: true },
              { text: "Advanced Analytics", included: true },
              { text: "Priority Support", included: true },
              { text: "Custom Domain", included: true },
              { text: "Team Collaboration", included: true },
              { text: "Custom Branding", included: false },
            ]}
          />
          </BlurFade>
          <BlurFade delay={0.25 * 3} inView>
          <PricingTier
            name="Enterprise"
            price="₹1000"
            description="For serious businesses"
            priceId={yearlyPlanId}
            features={[
              { text: "Unlimited Projects", included: true },
              { text: "Advanced Analytics", included: true },
              { text: "24/7 Priority Support", included: true },
              { text: "Custom Domain", included: true },
              { text: "Team Collaboration", included: true },
              { text: "Custom Branding", included: true },
            ]}
          />
          </BlurFade>
        </div>
        </BlurFade>
      </div>
    </div>
  );
};