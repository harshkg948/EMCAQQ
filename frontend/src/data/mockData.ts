export const APARTMENTS = [
  {
    id: '1',
    name: 'Green View Residency',
    location: 'Downtown, Sector 5',
    price: 1500,
    type: '1BHK',
    minSalary: 4000,
    role: ['Junior Developer', 'Intern', 'Accountant'],
    amenities: ['Gym', 'Parking', 'WiFi'],
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
  },
  {
    id: '2',
    name: 'Skyline Heights',
    location: 'Business District, North Wing',
    price: 2500,
    type: '2BHK',
    minSalary: 7000,
    role: ['Senior Developer', 'Manager', 'Product Owner'],
    amenities: ['Pool', 'Security', 'Balcony'],
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
  },
  {
    id: '3',
    name: 'Cozy Corner Apartments',
    location: 'Suburbs, East Side',
    price: 1200,
    type: 'Studio',
    minSalary: 3000,
    role: ['Junior Developer', 'Designer', 'Marketing Executive'],
    amenities: ['Laundry', 'Pet Friendly'],
    imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
  },
  {
    id: '4',
    name: 'Elite Executive Suites',
    location: 'Corporate Park, South Side',
    price: 4500,
    type: '3BHK',
    minSalary: 12000,
    role: ['Director', 'VP', 'CEO'],
    amenities: ['Sauna', 'Concierge', 'Private Lift'],
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
  },
];

export const SONGS = [
  {
    id: '1',
    title: 'Lo-Fi Chill Beats',
    artist: 'Relaxing Vibes',
    duration: '3:45',
    category: 'Focus',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: '2',
    title: 'Rainy Day Jazz',
    artist: 'Smooth Melodies',
    duration: '4:20',
    category: 'Relax',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: '3',
    title: 'Morning Forest',
    artist: 'Nature Sounds',
    duration: '5:00',
    category: 'Meditation',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
];

export const GAMES = [
  {
    id: '1',
    name: 'Mind Master',
    description: 'A simple memory game to sharpen your focus.',
    type: 'Puzzle',
    icon: 'Brain',
  },
  {
    id: '2',
    name: 'Zen Garden',
    description: 'Virtually rake sand and place stones to relax.',
    type: 'Simulation',
    icon: 'Leaf',
  },
  {
    id: '3',
    name: 'Bubble Pop',
    description: 'Infinite bubble wrap popping for stress relief.',
    type: 'Casual',
    icon: 'Zap',
  },
];

export const DEFAULT_ROUTINE = [
  { id: '1', time: '09:00 AM', task: 'Check Emails & Notifications', completed: false, category: 'Work' },
  { id: '2', time: '10:00 AM', task: 'Daily Stand-up Meeting', completed: false, category: 'Meeting' },
  { id: '3', time: '11:00 AM', task: 'Deep Work Session 1', completed: false, category: 'Focus' },
  { id: '4', time: '01:00 PM', task: 'Lunch Break & Walk', completed: false, category: 'Health' },
  { id: '5', time: '02:30 PM', task: 'Deep Work Session 2', completed: false, category: 'Focus' },
  { id: '6', time: '04:30 PM', task: 'Plan for Tomorrow', completed: false, category: 'Admin' },
];
