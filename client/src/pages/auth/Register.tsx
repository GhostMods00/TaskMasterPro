import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Alert } from '../../components/ui/alert';

const Register = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setIsLoading(true);

    try {
      await register(formData.username, formData.email, formData.password);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to register');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-slate-800/50 backdrop-blur p-8 rounded-lg border border-slate-700 shadow-xl">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-100">Create an account</h1>
            <p className="text-sm text-gray-300 mt-2">Enter your details to get started</p>
          </div>

          {error && (
            <Alert variant="destructive">
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-200">
                Username
              </label>
              <Input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={formData.username}
                onChange={handleChange}
                className="mt-1 bg-slate-900/50 border-slate-700 text-gray-100"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                Email address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 bg-slate-900/50 border-slate-700 text-gray-100"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 bg-slate-900/50 border-slate-700 text-gray-100"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-200">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 bg-slate-900/50 border-slate-700 text-gray-100"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-700 text-white transition-colors"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <div className="text-center text-sm text-gray-300">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="text-violet-400 hover:text-violet-300 transition-colors font-medium"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;