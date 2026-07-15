import type { Mission } from "../types";

export const MISSIONS: Mission[] = [
  {
    code: "daily-reviews-10",
    title: "Warm Up",
    description: "Review 10 cards today",
    type: "daily",
    targetType: "reviews",
    targetCount: 10,
    xpReward: 20,
    coinReward: 5,
  },
  {
    code: "daily-xp-30",
    title: "Keep Going",
    description: "Earn 30 XP today",
    type: "daily",
    targetType: "xp",
    targetCount: 30,
    xpReward: 10,
    coinReward: 3,
  },
  {
    code: "weekly-reviews-50",
    title: "Weekly Grind",
    description: "Review 50 cards this week",
    type: "weekly",
    targetType: "reviews",
    targetCount: 50,
    xpReward: 100,
    coinReward: 20,
  },
];
