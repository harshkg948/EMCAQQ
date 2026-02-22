import React, { useState, useEffect } from 'react';
import { Search, MapPin, DollarSign, Briefcase, Filter } from 'lucide-react';
import { APARTMENTS } from '@/data/mockData';
import { Apartment } from '@/types';
import { authService } from '../../services/auth.service';

export const ApartmentFinder = () => {
  const user = authService.getCurrentUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [salary, setSalary] = useState<number>(user?.salary ? user.salary / 12 : 0);
  const [role, setRole] = useState(user?.jobRole || '');

  useEffect(() => {
    if (user) {
      if (user.salary) setSalary(user.salary / 12);
      if (user.jobRole) setRole(user.jobRole);
    }
  }, []);

  const filteredApartments = APARTMENTS.filter(apt => {
    const matchesSearch = apt.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         apt.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSalary = salary === 0 || apt.minSalary <= salary;
    const matchesRole = role === '' || apt.role.some(r => r.toLowerCase().includes(role.toLowerCase()));
    
    return matchesSearch && matchesSalary && matchesRole;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-card p-8 rounded-[2.5rem] border border-border/50 shadow-sm">
        <h1 className="text-3xl font-black text-foreground">Find Your Sanctuary</h1>
        <p className="text-muted-foreground mt-1">Smart housing recommendations tailored to your professional journey.</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-card p-8 rounded-[2.5rem] shadow-sm border border-border/50 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input 
              type="text"
              placeholder="Location or building..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input 
              type="number"
              placeholder="Monthly Budget ($)"
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all"
              value={salary || ''}
              onChange={(e) => setSalary(Number(e.target.value))}
            />
          </div>
          <div className="relative">
            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input 
              type="text"
              placeholder="Your Profession"
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredApartments.length > 0 ? (
          filteredApartments.map((apt) => (
            <div key={apt.id} className="bg-card rounded-[2.5rem] overflow-hidden shadow-sm border border-border/50 hover:shadow-xl transition-all duration-300 group">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={apt.imageUrl} 
                  alt={apt.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-6 right-6 bg-background/80 backdrop-blur-md px-4 py-2 rounded-2xl text-primary font-black shadow-lg">
                  ${apt.price.toLocaleString()}/mo
                </div>
              </div>
              <div className="p-8 space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-black text-foreground">{apt.name}</h3>
                    <div className="flex items-center text-muted-foreground mt-2">
                      <MapPin className="w-4 h-4 mr-2 text-primary" />
                      <span className="text-sm font-medium">{apt.location}</span>
                    </div>
                  </div>
                  <span className="px-4 py-1.5 bg-secondary text-secondary-foreground rounded-xl text-xs font-black uppercase tracking-widest">
                    {apt.type}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {apt.amenities.map((amenity) => (
                    <span key={amenity} className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-lg font-medium border border-border/50">
                      {amenity}
                    </span>
                  ))}
                </div>

                <div className="pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-sm text-muted-foreground">
                    Matches role: <span className="text-foreground font-bold">{apt.role.slice(0, 1)}</span>
                  </div>
                  <button className="w-full sm:w-auto px-8 py-3 bg-primary text-primary-foreground rounded-2xl hover:bg-primary/90 transition-all font-black shadow-lg shadow-primary/20">
                    View Sanctuary
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-24 text-center bg-card rounded-[2.5rem] border border-dashed border-border">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <Filter className="text-muted-foreground w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-foreground">No matches found</h3>
            <p className="text-muted-foreground max-w-xs mx-auto mt-2">The forest is vast, but we couldn't find this specific spot. Try broader criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};
