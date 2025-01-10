import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Alert } from '../../ui/alert';

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const auth = useAuth();
  if (!auth) {
    return <div>Error: Auth context is not available</div>;
  }
  const { login, error, isLoading } = auth;
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="space-y-6">
      {error && <Alert variant="destructive">{error}</Alert>}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            type="email"
            placeholder="Email"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </div>

        <div>
          <Input
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
            })}
            type="password"
            placeholder="Password"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          loading={isLoading}
        >
          Sign in
        </Button>
      </form>

      <div className="text-center text-sm">
        <Link 
          to="/forgot-password" 
          className="text-primary hover:text-primary/90"
        >
          Forgot password?
        </Link>
      </div>

      <div className="text-center text-sm">
        Don't have an account?{' '}
        <Link 
          to="/register" 
          className="text-primary hover:text-primary/90"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};