import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Alert } from '../../ui/alert';

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm = () => {
  const { register: registerUser, error, isLoading } = useAuth();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>();
  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    if (data.password !== data.confirmPassword) {
      return;
    }

    try {
      await registerUser(data.username, data.email, data.password);
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <div className="space-y-6">
      {error && <Alert variant="destructive">{error}</Alert>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'Username must be at least 3 characters'
              }
            })}
            placeholder="Username"
            error={!!errors.username}
            helperText={errors.username?.message}
          />
        </div>

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

        <div>
          <Input
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: value =>
                value === password || 'Passwords do not match'
            })}
            type="password"
            placeholder="Confirm Password"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          loading={isLoading}
        >
          Create Account
        </Button>
      </form>

      <div className="text-center text-sm">
        Already have an account?{' '}
        <Link 
          to="/login" 
          className="text-primary hover:text-primary/90"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
};