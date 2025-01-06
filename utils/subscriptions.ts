export const SUBSCRIPTION_PLANS = {
    FREE: 'free',
    MONTHLY: 'monthly',
    YEARLY: 'yearly'
  } as const;
  
export const PROJECT_LIMITS = {
    [SUBSCRIPTION_PLANS.FREE]: 3,
    [SUBSCRIPTION_PLANS.MONTHLY]: 10,
    [SUBSCRIPTION_PLANS.YEARLY]: Infinity
  } as const;