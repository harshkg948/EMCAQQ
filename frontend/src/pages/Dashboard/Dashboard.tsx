import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  Activity, 
  Music, 
  ArrowRight, 
  User, 
  TrendingUp, 
  Clock,
  Sparkles,
  ClipboardCheck,
  Loader2,
  CheckCircle
} from 'lucide-react';
import { APARTMENTS, DEFAULT_ROUTINE } from '@/data/mockData';
import { authService } from '../../services/auth.service';
import { healthService } from '../../services/health.service';

export const Dashboard = () => {
  const user = authService.getCurrentUser();
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleEndDay = async () => {
    setLoading(true);
    try {
      const response = await healthService.getDailyWellnessSummary({
        steps: 6450,
        water: 4,
        movementMinutes: 45,
        completedTasks: DEFAULT_ROUTINE.filter(t => t.completed).length,
        totalTasks: DEFAULT_ROUTINE.length
      });
      setSummary(response);
    } catch (error) {
      console.error('Failed to get wellness summary:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-card p-8 rounded-[2.5rem] shadow-sm border border-border/50">
        <div>
          <h1 className="text-4xl font-black text-foreground tracking-tight">Welcome back, {user?.name || 'User'}! 🌿</h1>
          <p className="text-muted-foreground mt-2 text-lg">Your productivity and peace are in harmony today.</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 bg-background p-4 rounded-2xl border border-border">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <User className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-foreground">{user?.jobRole || 'Professional'}</div>
              <div className="text-xs text-muted-foreground">{user?.salary ? `$${user.salary.toLocaleString()} / year` : 'Assessment pending'}</div>
            </div>
          </div>
          <button 
            onClick={handleEndDay}
            disabled={loading}
            className="flex items-center justify-center gap-2 py-3 bg-secondary text-secondary-foreground rounded-xl font-bold hover:bg-secondary/90 transition-all shadow-md disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ClipboardCheck className="w-5 h-5" />}
            End Work Day
          </button>
        </div>
      </div>

      {summary && (
        <div className="bg-accent/10 border-2 border-accent/20 p-8 rounded-[2.5rem] animate-in zoom-in duration-500">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="w-8 h-8 text-accent" />
            <h2 className="text-2xl font-black text-foreground tracking-tight">Daily Wellness Analysis</h2>
            <div className="ml-auto bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-black">
              Score: {summary.healthScore}/100
            </div>
          </div>
          <p className="text-lg text-foreground/80 mb-6 italic">"{summary.analysis}"</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {summary.suggestions.map((suggestion: string, i: number) => (
              <div key={i} className="flex items-center gap-3 bg-white/50 p-4 rounded-2xl border border-accent/10">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span className="font-medium">{suggestion}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Stats */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Apartment Highlight */}
          <Link to="/apartments" className="group bg-card p-8 rounded-[2.5rem] border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300">
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center text-secondary-foreground group-hover:scale-110 transition-transform shadow-inner">
                <Home className="w-7 h-7" />
              </div>
              <ArrowRight className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Housing Search</h3>
            <p className="text-muted-foreground mb-6">Found <span className="text-primary font-bold">{APARTMENTS.length}</span> apartments matching your profile.</p>
            <div className="flex -space-x-3">
              {APARTMENTS.slice(0, 3).map((apt, i) => (
                <img key={i} src={apt.imageUrl} className="w-10 h-10 rounded-full border-2 border-card object-cover" alt="" />
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-card bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                +{APARTMENTS.length - 3}
              </div>
            </div>
          </Link>

          {/* Routine Highlight */}
          <Link to="/routine" className="group bg-card p-8 rounded-[2.5rem] border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300">
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-inner">
                <Calendar className="w-7 h-7" />
              </div>
              <ArrowRight className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Daily Routine</h3>
            <p className="text-muted-foreground mb-6">Next task: <span className="text-foreground font-semibold">{DEFAULT_ROUTINE[0].task}</span></p>
            <div className="flex items-center gap-2 text-sm text-primary font-bold bg-primary/10 w-fit px-3 py-1 rounded-lg">
              <Clock className="w-4 h-4" />
              {DEFAULT_ROUTINE[0].time}
            </div>
          </Link>

          {/* Fitness Highlight */}
          <Link to="/fitness" className="group bg-primary p-8 rounded-[2.5rem] shadow-lg shadow-primary/20 hover:shadow-2xl transition-all duration-300 text-primary-foreground md:col-span-2 overflow-hidden relative">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-4">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                  <Activity className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Wellness Tracker</h3>
                  <p className="text-primary-foreground/80 mt-1">You've reached 65% of your daily steps goal.</p>
                </div>
              </div>
              <div className="flex gap-8">
                <div className="text-center">
                  <div className="text-3xl font-black">6,450</div>
                  <div className="text-primary-foreground/60 text-xs font-bold uppercase tracking-wider">Steps</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black">4</div>
                  <div className="text-primary-foreground/60 text-xs font-bold uppercase tracking-wider">Glasses</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black">45</div>
                  <div className="text-primary-foreground/60 text-xs font-bold uppercase tracking-wider">Minutes</div>
                </div>
              </div>
            </div>
            <TrendingUp className="absolute -bottom-6 -right-6 w-48 h-48 text-white/5 -rotate-12" />
          </Link>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          <div className="bg-card p-8 rounded-[2.5rem] border border-border/50 shadow-sm h-full flex flex-col">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center text-primary shadow-inner">
                <Music className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Relaxation</h3>
            </div>
            
            <div className="flex-1 space-y-6">
              <div className="p-5 bg-muted rounded-2xl border border-border/50 transition-colors hover:bg-muted/70">
                <div className="text-xs font-bold text-muted-foreground uppercase mb-2">Recommended for you</div>
                <div className="font-bold text-foreground text-lg">Deep Work Lo-Fi</div>
                <div className="text-sm text-muted-foreground">24 mins • Chillout</div>
              </div>
              
              <div className="p-5 bg-muted rounded-2xl border border-border/50 transition-colors hover:bg-muted/70">
                <div className="text-xs font-bold text-muted-foreground uppercase mb-2">Popular Mini-Game</div>
                <div className="font-bold text-foreground text-lg">Mind Master</div>
                <div className="text-sm text-muted-foreground">Focus & Memory</div>
              </div>
            </div>

            <Link to="/relaxation" className="mt-8 flex items-center justify-center gap-2 py-4 bg-primary text-primary-foreground rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
              <Sparkles className="w-5 h-5 text-accent" />
              Start Relaxing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
