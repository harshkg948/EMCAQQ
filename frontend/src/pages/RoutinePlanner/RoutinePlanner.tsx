import React, { useState, useEffect } from 'react';
import { Plus, CheckCircle2, Circle, Clock, Trash2, Calendar as CalendarIcon, AlertTriangle } from 'lucide-react';
import { DEFAULT_ROUTINE } from '@/data/mockData';
import { RoutineTask } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { authService } from '@/services/auth.service';
import { healthService } from '@/services/health.service';

export const RoutinePlanner = () => {
  const [tasks, setTasks] = useState<RoutineTask[]>([]);
  const [newTask, setNewTask] = useState('');
  const [newTime, setNewTime] = useState('');
  const user = authService.getCurrentUser();

  useEffect(() => {
    const saved = localStorage.getItem('emcaq_routine');
    if (saved) {
      setTasks(JSON.parse(saved));
    } else {
      setTasks(DEFAULT_ROUTINE);
    }
  }, []);

  // Check for missed tasks
  useEffect(() => {
    const checkMissedTasks = () => {
      const now = new Date();
      const currentTimeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      const missedTask = tasks.find(t => !t.completed && t.time < currentTimeString);
      
      if (missedTask) {
        healthService.reportRoutineDeviation({
          task: missedTask.task,
          scheduledTime: missedTask.time,
          currentTime: currentTimeString
        });
      }
    };

    const interval = setInterval(checkMissedTasks, 300000); // Check every 5 minutes
    return () => clearInterval(interval);
  }, [tasks, user]);

  useEffect(() => {
    localStorage.setItem('emcaq_routine', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask || !newTime) return;

    const task: RoutineTask = {
      id: uuidv4(),
      task: newTask,
      time: newTime,
      completed: false,
      category: 'General',
    };

    setTasks([...tasks, task].sort((a, b) => a.time.localeCompare(b.time)));
    setNewTask('');
    setNewTime('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progress = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end bg-card p-8 rounded-[2.5rem] border border-border/50 shadow-sm">
        <div>
          <h1 className="text-3xl font-black text-foreground tracking-tight">Daily Flow</h1>
          <p className="text-muted-foreground mt-1">Cultivate productivity through mindful routines.</p>
        </div>
        <div className="text-right">
          <div className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-1">Ebb & Flow</div>
          <div className="text-3xl font-black text-primary">{Math.round(progress)}%</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-4 w-full bg-muted rounded-full overflow-hidden shadow-inner border border-border/50">
        <div 
          className="h-full bg-primary transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(74,124,68,0.3)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Task Form */}
        <div className="md:col-span-1">
          <form onSubmit={addTask} className="bg-card p-8 rounded-[2.5rem] border border-border/50 shadow-sm sticky top-8">
            <h3 className="text-xl font-black text-foreground mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" />
              Sow Task
            </h3>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-black text-muted-foreground uppercase tracking-widest mb-2 ml-1">Task Description</label>
                <input 
                  type="text"
                  placeholder="e.g., Garden of Ideas"
                  className="w-full px-4 py-3 rounded-2xl border border-border bg-background outline-none focus:ring-2 focus:ring-primary transition-all"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-black text-muted-foreground uppercase tracking-widest mb-2 ml-1">Time of Bloom</label>
                <input 
                  type="time"
                  className="w-full px-4 py-3 rounded-2xl border border-border bg-background outline-none focus:ring-2 focus:ring-primary transition-all"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                />
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-black hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 mt-2"
              >
                Plan Growth
              </button>
            </div>
          </form>
        </div>

        {/* Task List */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-4">
            <h3 className="text-xl font-black text-foreground flex items-center gap-3">
              <CalendarIcon className="w-6 h-6 text-primary" />
              Today's Cycle
            </h3>
            <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">{tasks.length} Total</span>
          </div>

          <div className="space-y-4">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <div 
                  key={task.id}
                  className={`flex items-center justify-between p-6 bg-card rounded-[2rem] border transition-all duration-300 group ${
                    task.completed ? 'border-primary/20 bg-primary/5 opacity-70' : 'border-border/50 shadow-sm hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-5">
                    <button 
                      onClick={() => toggleTask(task.id)}
                      className="focus:outline-none transition-transform active:scale-90"
                    >
                      {task.completed ? (
                        <CheckCircle2 className="w-7 h-7 text-primary shadow-sm" />
                      ) : (
                        <Circle className="w-7 h-7 text-muted group-hover:text-primary/50 transition-colors" />
                      )}
                    </button>
                    <div>
                      <h4 className={`text-lg font-bold tracking-tight ${task.completed ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                        {task.task}
                      </h4>
                      <div className="flex items-center text-xs font-black text-muted-foreground uppercase tracking-widest mt-1">
                        <Clock className="w-3.5 h-3.5 mr-1.5 text-primary" />
                        {task.time}
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => deleteTask(task.id)}
                    className="p-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-card rounded-[2.5rem] border border-dashed border-border flex flex-col items-center justify-center">
                <CalendarIcon className="w-12 h-12 text-muted mb-4" />
                <p className="text-muted-foreground font-medium italic">A blank canvas for your day.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
