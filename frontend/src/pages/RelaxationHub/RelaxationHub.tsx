import React, { useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, Music, Gamepad2, Volume2, Brain, Leaf, Zap, Sparkles } from 'lucide-react';
import { SONGS, GAMES } from '@/data/mockData';

export const RelaxationHub = () => {
  const [activeSong, setActiveSong] = useState(SONGS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeGame, setActiveGame] = useState<string | null>(null);

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-center bg-card p-8 rounded-[2.5rem] border border-border/50 shadow-sm gap-4">
        <div>
          <h1 className="text-3xl font-black text-foreground tracking-tight">Whispering Woods</h1>
          <p className="text-muted-foreground mt-1 font-medium">Calm your spirit with nature's melodies and mindful play.</p>
        </div>
        <div className="bg-primary/10 px-6 py-3 rounded-2xl flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs shadow-inner">
          <Sparkles className="w-5 h-5 text-accent" />
          <span>Zen State Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Music Player */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card p-8 rounded-[2.5rem] shadow-sm border border-border/50">
            <h3 className="text-2xl font-black text-foreground mb-8 flex items-center gap-3">
              <Music className="w-7 h-7 text-primary" />
              Verdant Melodies
            </h3>
            
            <div className="space-y-4">
              {SONGS.map((song) => (
                <div 
                  key={song.id}
                  onClick={() => setActiveSong(song)}
                  className={`flex items-center justify-between p-5 rounded-[2rem] cursor-pointer transition-all duration-300 border group ${
                    activeSong.id === song.id 
                      ? 'bg-primary text-primary-foreground border-primary shadow-xl shadow-primary/20 scale-[1.02]' 
                      : 'bg-muted/50 text-foreground border-border/50 hover:bg-muted hover:scale-[1.01]'
                  }`}
                >
                  <div className="flex items-center gap-5">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                      activeSong.id === song.id ? 'bg-white/20' : 'bg-background shadow-inner'
                    }`}>
                      <Music className={activeSong.id === song.id ? 'text-white' : 'text-primary'} />
                    </div>
                    <div>
                      <h4 className="font-black text-lg leading-tight">{song.title}</h4>
                      <p className={`text-sm font-medium mt-1 ${activeSong.id === song.id ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                        {song.artist} • {song.category}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <span className="text-xs font-black uppercase tracking-widest opacity-60">{song.duration}</span>
                    <div className={`p-3 rounded-xl ${activeSong.id === song.id ? 'bg-white/20' : 'bg-primary/10'}`}>
                      {activeSong.id === song.id && isPlaying ? (
                        <Pause className="w-5 h-5 fill-current" />
                      ) : (
                        <Play className="w-5 h-5 fill-current" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Now Playing Bar */}
            <div className="mt-10 bg-sidebar border border-border/50 rounded-[2.5rem] p-8 shadow-inner">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center shadow-lg animate-spin-slow">
                    <Music className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent rounded-full border-4 border-sidebar animate-bounce"></div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h4 className="text-xl font-black text-foreground">{activeSong.title}</h4>
                  <p className="text-muted-foreground font-medium">{activeSong.artist}</p>
                </div>
                <div className="flex items-center gap-8">
                  <button className="text-muted-foreground hover:text-primary transition-colors active:scale-90">
                    <SkipBack className="w-7 h-7 fill-current" />
                  </button>
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-xl shadow-primary/20 active:scale-95"
                  >
                    {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
                  </button>
                  <button className="text-muted-foreground hover:text-primary transition-colors active:scale-90">
                    <SkipForward className="w-7 h-7 fill-current" />
                  </button>
                </div>
                <div className="hidden md:flex items-center gap-4 text-muted-foreground">
                  <Volume2 className="w-6 h-6 text-primary" />
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden shadow-inner border border-border/50">
                    <div className="h-full bg-primary w-2/3 shadow-[0_0_8px_rgba(74,124,68,0.5)]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mini Games */}
        <div className="space-y-6 h-full">
          <div className="bg-card p-10 rounded-[2.5rem] shadow-sm border border-border/50 h-full flex flex-col">
            <h3 className="text-2xl font-black text-foreground mb-8 flex items-center gap-3">
              <Gamepad2 className="w-7 h-7 text-primary" />
              Focus Petals
            </h3>
            <div className="space-y-5 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {GAMES.map((game) => (
                <div 
                  key={game.id}
                  onClick={() => setActiveGame(game.name)}
                  className="p-6 bg-muted/30 rounded-[2rem] border border-border/50 hover:border-primary/30 hover:bg-card hover:shadow-xl transition-all duration-300 cursor-pointer group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                    {game.icon === 'Brain' && <Brain className="w-12 h-12" />}
                    {game.icon === 'Leaf' && <Leaf className="w-12 h-12" />}
                    {game.icon === 'Zap' && <Zap className="w-12 h-12" />}
                  </div>
                  <div className="flex items-start gap-5 relative z-10">
                    <div className="w-14 h-14 bg-background rounded-2xl shadow-inner border border-border/50 flex items-center justify-center group-hover:scale-110 transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                      {game.icon === 'Brain' && <Brain className="w-6 h-6" />}
                      {game.icon === 'Leaf' && <Leaf className="w-6 h-6" />}
                      {game.icon === 'Zap' && <Zap className="w-6 h-6" />}
                    </div>
                    <div>
                      <h4 className="font-black text-foreground text-lg leading-tight">{game.name}</h4>
                      <p className="text-sm text-muted-foreground font-medium mt-1 leading-relaxed">{game.description}</p>
                    </div>
                  </div>
                  <button className="mt-5 w-full py-3 bg-secondary text-secondary-foreground rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-accent transition-all active:scale-[0.98]">
                    Cultivate Focus
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Game Modal Placeholder */}
      {activeGame && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-card rounded-[3rem] p-12 max-w-lg w-full text-center space-y-8 shadow-[0_0_50px_rgba(74,124,68,0.1)] border border-border/50 relative overflow-hidden">
             <div className="absolute top-[-10%] left-[-10%] w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>
             
            <div className="w-24 h-24 bg-primary/10 text-primary rounded-[2rem] flex items-center justify-center mx-auto shadow-inner relative z-10">
              <Gamepad2 className="w-12 h-12" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl font-black text-foreground tracking-tight italic">"{activeGame}"</h2>
              <p className="text-muted-foreground mt-3 font-medium text-lg leading-relaxed">Prepare to immerse yourself in a moment of pure focus and serenity.</p>
            </div>
            <div className="flex flex-col gap-4 relative z-10">
              <button 
                onClick={() => setActiveGame(null)}
                className="py-5 bg-primary text-primary-foreground rounded-[2rem] font-black text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 active:scale-95"
              >
                Let It Bloom
              </button>
              <button 
                onClick={() => setActiveGame(null)}
                className="py-3 text-muted-foreground font-black uppercase tracking-widest text-xs hover:text-foreground transition-colors"
              >
                Not This Cycle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
