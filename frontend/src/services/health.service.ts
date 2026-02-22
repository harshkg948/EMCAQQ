import { emitter } from '@/agentSdk';
import { authService } from './auth.service';

export const healthService = {
  async getDailyWellnessSummary(metrics: {
    steps: number;
    water: number;
    movementMinutes: number;
    completedTasks: number;
    totalTasks: number;
  }) {
    const user = authService.getCurrentUser();
    
    // Agent sync event available? -> Use ONLY await emitter.emit()
    const response = await emitter.emit({
      agentId: 'c594ca21-b5e0-414b-90fd-31466619140c',
      event: 'daily_wellness_summary',
      payload: metrics,
      uid: user?.id ?? crypto.randomUUID()
    });
    
    return response;
  },

  async reportSedentaryBehavior(metrics: {
    inactiveMinutes: number;
    lastSteps: number;
    user?: string;
  }) {
    const user = authService.getCurrentUser();
    
    return await emitter.emit({
      agentId: 'c594ca21-b5e0-414b-90fd-31466619140c',
      event: 'sedentary_behavior_detected',
      payload: metrics,
      uid: user?.id ?? crypto.randomUUID()
    });
  },

  async reportRoutineDeviation(metrics: {
    task: string;
    scheduledTime: string;
    currentTime: string;
  }) {
    const user = authService.getCurrentUser();
    
    return await emitter.emit({
      agentId: 'c594ca21-b5e0-414b-90fd-31466619140c',
      event: 'routine_deviation_alert',
      payload: metrics,
      uid: user?.id ?? crypto.randomUUID()
    });
  }
};
