export interface Apartment {
  id: string;
  name: string;
  location: string;
  price: number;
  type: string;
  minSalary: number;
  role: string[];
  amenities: string[];
  imageUrl: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
  category: 'Focus' | 'Relax' | 'Meditation';
  url: string;
}

export interface Game {
  id: string;
  name: string;
  description: string;
  type: string;
  icon: string;
}

export interface RoutineTask {
  id: string;
  time: string;
  task: string;
  completed: boolean;
  category: string;
}

export interface FitnessLog {
  id: string;
  date: string;
  steps: number;
  waterIntake: number; // in glasses
  workoutMinutes: number;
  mood: string;
}
