import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/auth.service';
import { Logo } from '../../components/layout/Logo';

export const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: 'Other',
    age: '',
    dob: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authService.register({
        ...formData,
        age: parseInt(formData.age),
      });
      navigate('/assessment');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>

      <div className="w-full max-w-lg space-y-8 bg-card p-10 rounded-3xl shadow-2xl shadow-primary/5 border border-border/50 relative z-10">
        <div className="flex flex-col items-center">
          <Logo size={80} className="mb-4" />
          <h2 className="text-center text-3xl font-bold tracking-tight text-foreground">
            Join EMCAQ
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Start your journey towards a balanced life
          </p>
        </div>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          {error && <div className="text-destructive text-center bg-destructive/10 py-2 rounded-lg text-sm font-medium">{error}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              type="text"
              required
              className="block w-full rounded-2xl border-0 py-3 text-foreground ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-4 bg-muted/30"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              name="email"
              type="email"
              required
              className="block w-full rounded-2xl border-0 py-3 text-foreground ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-4 bg-muted/30"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              name="password"
              type="password"
              required
              className="block w-full rounded-2xl border-0 py-3 text-foreground ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-4 bg-muted/30 col-span-1 md:col-span-2"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <select
              name="gender"
              className="block w-full rounded-2xl border-0 py-3 text-foreground ring-1 ring-inset ring-border focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-4 bg-muted/30"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              name="age"
              type="number"
              required
              className="block w-full rounded-2xl border-0 py-3 text-foreground ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-4 bg-muted/30"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
            />
            <div className="col-span-1 md:col-span-2">
              <label className="block text-xs font-medium text-muted-foreground mb-1 ml-1">Date of Birth</label>
              <input
                name="dob"
                type="date"
                required
                className="block w-full rounded-2xl border-0 py-3 text-foreground ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-4 bg-muted/30"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-2xl bg-primary px-3 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-200 shadow-lg shadow-primary/20 mt-4"
            >
              Create Account
            </button>
          </div>
        </form>
        <div className="text-center">
          <Link to="/login" className="text-primary font-medium hover:text-primary/80 transition-colors">
            Already a member? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};
