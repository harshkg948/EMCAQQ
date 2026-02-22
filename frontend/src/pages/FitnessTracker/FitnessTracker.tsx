import React, { useState, useEffect } from 'react';
import { Activity, Footprints, Droplets, Timer, Heart, Trophy, ArrowUpRight, AlertCircle } from 'lucide-react';
import { authService } from '@/services/auth.service';
import { healthService } from '@/services/health.service';

export const FitnessTracker = () => {
  const [steps, setSteps] = useState(6450);
  const [water, setWater] = useState(4);
  const [minutes, setMinutes] = useState(45);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const user = authService.getCurrentUser();

  // Simulate sedentary detection
  useEffect(() => {
    const checkSedentary = () => {
      const inactiveMinutes = (Date.now() - lastActivityTime) / 60000;
      if (inactiveMinutes >= 60) {
        healthService.reportSedentaryBehavior({
          inactiveMinutes: Math.round(inactiveMinutes),
          lastSteps: steps,
          user: user?.name
        });
        // Reset to avoid multiple triggers in short succession for demo
        setLastActivityTime(Date.now());
      }
    };

    const interval = setInterval(checkSedentary, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [lastActivityTime, steps, user]);

  const stats = [
    { 
      label: 'Footprints', 
      value: steps.toLocaleString(), 
      goal: 10000, 
      unit: 'steps', 
      icon: Footprints, 
      color: 'bg-primary',
      progress: (steps / 10000) * 100 
    },
    { 
      label: 'Hydration', 
      value: water, 
      goal: 8, 
      unit: 'glasses', 
      icon: Droplets, 
      color: 'bg-accent',
      progress: (water / 8) * 100 
    },
    { 
      label: 'Movement', 
      value: minutes, 
      goal: 60, 
      unit: 'mins', 
      icon: Timer, 
      color: 'bg-secondary',
      progress: (minutes / 60) * 100 
    },
  ];

  return (
    <div className="space-y-10 animate-in zoom-in duration-500">
      <div className="bg-card p-8 rounded-[2.5rem] border border-border/50 shadow-sm">
        <h1 className="text-3xl font-black text-foreground tracking-tight">Vitality Compass</h1>
        <p className="text-muted-foreground mt-1">Nurture your body while you nourish your career.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card p-8 rounded-[2.5rem] border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="flex justify-between items-start mb-6">
              <div className={`${stat.color} p-4 rounded-2xl shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform`}>
                <stat.icon className="text-primary-foreground w-6 h-6" />
              </div>
              <div className="flex items-center gap-1 text-primary font-black text-sm">
                <ArrowUpRight className="w-4 h-4" />
                <span>+12%</span>
              </div>
            </div>
            
            <div className="space-y-1">
              <span className="text-muted-foreground text-xs font-black uppercase tracking-widest">{stat.label}</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-foreground">{stat.value}</span>
                <span className="text-muted-foreground text-sm font-bold italic">/ {stat.goal} {stat.unit}</span>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <div className="h-4 w-full bg-muted rounded-full overflow-hidden shadow-inner border border-border/50">
                <div 
                  className={`h-full ${stat.color} transition-all duration-1000 shadow-[0_0_10px_rgba(0,0,0,0.1)]`}
                  style={{ width: `${Math.min(stat.progress, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                <span className="text-muted-foreground">Bloom Status</span>
                <span className="text-foreground">{Math.round(stat.progress)}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Log */}
        <div className="bg-card p-10 rounded-[2.5rem] border border-border/50 shadow-sm">
          <h3 className="text-2xl font-black text-foreground mb-8 flex items-center gap-3">
            <Activity className="w-7 h-7 text-primary" />
            Nurture Log
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="space-y-4">
              <p className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Water Well</p>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => {
                    setWater(Math.max(0, water - 1));
                    setLastActivityTime(Date.now());
                  }}
                  className="w-12 h-12 rounded-2xl border border-border flex items-center justify-center hover:bg-muted transition-all active:scale-90"
                >
                  -
                </button>
                <span className="font-black text-2xl w-8 text-center">{water}</span>
                <button 
                  onClick={() => {
                    setWater(water + 1);
                    setLastActivityTime(Date.now());
                  }}
                  className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-90"
                >
                  +
                </button>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Earth Walk</p>
              <button 
                onClick={() => {
                  setSteps(steps + 500);
                  setLastActivityTime(Date.now());
                }}
                className="w-full py-3.5 px-4 rounded-2xl border-2 border-primary/20 bg-primary/5 text-primary font-black hover:bg-primary/10 transition-all active:scale-95"
              >
                +500 Steps
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Energy Flow</p>
              <button 
                onClick={() => {
                  setMinutes(minutes + 5);
                  setLastActivityTime(Date.now());
                }}
                className="w-full py-3.5 px-4 rounded-2xl border-2 border-secondary/50 bg-secondary/20 text-secondary-foreground font-black hover:bg-secondary/30 transition-all active:scale-95"
              >
                +5 Mins
              </button>
            </div>
          </div>
        </div>

        {/* Health Insights */}
        <div className="bg-primary rounded-[2.5rem] p-10 text-primary-foreground relative overflow-hidden shadow-lg shadow-primary/20">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
                <Trophy className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-2xl font-black tracking-tight">Vibrancy Streak</h3>
            </div>
            <p className="text-primary-foreground/90 mb-8 text-xl font-medium leading-relaxed">The spring of health is flowing! You've met your hydration goals for 5 sun cycles.</p>
            <div className="flex gap-6">
              <div className="bg-white/10 backdrop-blur-md rounded-[2rem] p-6 flex-1 border border-white/5">
                <div className="text-primary-foreground/60 text-xs font-black uppercase tracking-widest mb-2">Energy Radiant</div>
                <div className="text-3xl font-black">1,240 <span className="text-sm font-normal opacity-60">kcal</span></div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-[2rem] p-6 flex-1 border border-white/5">
                <div className="text-primary-foreground/60 text-xs font-black uppercase tracking-widest mb-2">Life Rhythm</div>
                <div className="text-3xl font-black">72 <span className="text-sm font-normal opacity-60">BPM</span></div>
              </div>
            </div>
          </div>
          <Heart className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5 rotate-12" />
        </div>
      </div>
    </div>
  );
};
