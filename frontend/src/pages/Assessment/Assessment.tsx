import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../services/user.service';
import { Logo } from '../../components/layout/Logo';

export const Assessment = () => {
  const [formData, setFormData] = useState({
    jobRole: '',
    city: '',
    workDuration: '',
    distance: '',
    jobType: 'Full-time',
    salary: '',
    company: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await userService.updateAssessment({
        ...formData,
        distance: parseFloat(formData.distance),
        salary: parseFloat(formData.salary),
      });
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Assessment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-[-5%] left-[-5%] w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-5%] right-[-5%] w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>

      <div className="w-full max-w-lg space-y-8 bg-card p-10 rounded-3xl shadow-2xl shadow-primary/5 border border-border/50 relative z-10">
        <div className="flex flex-col items-center">
          <Logo size={60} className="mb-2" />
          <h2 className="text-center text-3xl font-bold tracking-tight text-foreground">
            Professional Assessment
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Let us understand your work-life landscape
          </p>
        </div>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          {error && <div className="text-destructive text-center bg-destructive/10 py-2 rounded-lg text-sm font-medium">{error}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1 md:col-span-2">
              <input
                name="jobRole"
                type="text"
                required
                className="block w-full rounded-2xl border-0 py-3 text-foreground ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-4 bg-muted/30"
                placeholder="Job Role (e.g. Software Engineer)"
                value={formData.jobRole}
                onChange={handleChange}
              />
            </div>
            <input
              name="company"
              type="text"
              required
              className="block w-full rounded-2xl border-0 py-3 text-foreground ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-4 bg-muted/30"
              placeholder="Company"
              value={formData.company}
              onChange={handleChange}
            />
            <input
              name="city"
              type="text"
              required
              className="block w-full rounded-2xl border-0 py-3 text-foreground ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-4 bg-muted/30"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
            />
             <input
              name="workDuration"
              type="text"
              required
              className="block w-full rounded-2xl border-0 py-3 text-foreground ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-4 bg-muted/30"
              placeholder="Work Duration (e.g. 2 years)"
              value={formData.workDuration}
              onChange={handleChange}
            />
            <input
              name="distance"
              type="number"
              step="0.1"
              required
              className="block w-full rounded-2xl border-0 py-3 text-foreground ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-4 bg-muted/30"
              placeholder="Home to Office (km)"
              value={formData.distance}
              onChange={handleChange}
            />
            <select
              name="jobType"
              className="block w-full rounded-2xl border-0 py-3 text-foreground ring-1 ring-inset ring-border focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-4 bg-muted/30"
              value={formData.jobType}
              onChange={handleChange}
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Freelance">Freelance</option>
              <option value="Remote">Remote</option>
            </select>
            <input
              name="salary"
              type="number"
              required
              className="block w-full rounded-2xl border-0 py-3 text-foreground ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-4 bg-muted/30"
              placeholder="Annual Salary"
              value={formData.salary}
              onChange={handleChange}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-2xl bg-primary px-3 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-200 shadow-lg shadow-primary/20 mt-4 disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Complete Assessment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
