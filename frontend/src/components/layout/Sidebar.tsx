import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Home, 
  Calendar, 
  Activity, 
  Music, 
  Briefcase,
  Settings,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';

import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth.service';
import { Logo } from './Logo';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Home, label: 'Apartments', path: '/apartments' },
  { icon: Calendar, label: 'Routine', path: '/routine' },
  { icon: Activity, label: 'Fitness', path: '/fitness' },
  { icon: Music, label: 'Relaxation', path: '/relaxation' },
];

export const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div className="w-64 bg-sidebar border-r border-border h-screen flex flex-col fixed left-0 top-0">
      <div className="p-6 flex items-center gap-3">
        <Logo size={42} />
        <span className="text-xl font-bold text-foreground tracking-tight">EMCAQ</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-primary/10 text-primary font-semibold shadow-sm" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )
            }
          >
            <item.icon className={cn("w-5 h-5", "group-hover:scale-110 transition-transform")} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-border space-y-1">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};
