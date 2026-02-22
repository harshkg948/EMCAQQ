import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/auth.service';
import { Logo } from '../../components/layout/Logo';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authService.login({ email, password });
      navigate('/assessment');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Nature elements placeholders - could be SVGs or CSS shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md space-y-8 bg-card p-10 rounded-3xl shadow-2xl shadow-primary/5 border border-border/50 relative z-10">
        <div className="flex flex-col items-center">
          <Logo size={80} className="mb-4" />
          <h2 className="text-center text-3xl font-bold tracking-tight text-foreground">
            Welcome back to EMCAQ
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Find your peace and productivity
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <div className="text-destructive text-center bg-destructive/10 py-2 rounded-lg text-sm font-medium">{error}</div>}
          <div className="space-y-4">
            <div>
              <input
                type="email"
                required
                className="block w-full rounded-2xl border-0 py-3 text-foreground ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-4 bg-muted/30"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                required
                className="block w-full rounded-2xl border-0 py-3 text-foreground ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-4 bg-muted/30"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-2xl bg-primary px-3 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-200 shadow-lg shadow-primary/20"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="text-center">
          <Link to="/register" className="text-primary font-medium hover:text-primary/80 transition-colors">
            New to the community? Register
          </Link>
        </div>
      </div>
    </div>
  );
};
