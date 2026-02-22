import type { AgentConfig } from './types';
import { z } from 'zod';

export const AGENT_CONFIGS: AgentConfig[] = [
  {
    "id": "c594ca21-b5e0-414b-90fd-31466619140c",
    "name": "EMHOM AI Health Assistant",
    "description": "A proactive wellness companion for professionals that monitors activity levels and provides intelligent recommendations to prevent burnout.",
    "triggerEvents": [
      {
        "type": "async",
        "name": "sedentary_behavior_detected",
        "description": "When the system tracking indicates the user has been stationary for over 60 minutes, the agent proactively suggests a quick movement break."
      },
      {
        "type": "async",
        "name": "routine_deviation_alert",
        "description": "When a scheduled healthcare routine task (like water intake or posture check) is missed, the agent sends a nudge to encourage completion."
      },
      {
        "type": "sync",
        "name": "daily_wellness_summary",
        "description": "Triggered at the end of the user's defined work hours to provide an intelligent analysis of the day's health metrics and suggestions for improvement.",
        "outputSchema": z.object({
          analysis: z.string(),
          suggestions: z.array(z.string()),
          healthScore: z.number()
        })
      }
    ],
    "config": {
      "appId": "e2e5e542-ed5a-44ad-bbb0-84b3c24eb886",
      "accountId": "ca702cb6-9d20-4a91-8c24-7c5d283583ed",
      "widgetKey": "5gksDgBPuwJT5bJBNbzhNVPWi0N4gX4TXXwX2A92"
    }
  }
];
