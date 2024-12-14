import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Layouts
import DashboardLayout from '../components/shared/Layout/DashLayout';
import AuthLayout from '../components/shared/Layout/AuthLayout';

// Import pages with lazy loading
const Dashboard = React.lazy(() => import('../pages/dashboard/Dashboard'));
const ProjectList = React.lazy(() => import('../pages/projects/ProjectList'));
const ProjectDetails = React.lazy(() => import('../pages/projects/ProjectDetails'));
const TaskList = React.lazy(() => import('../pages/tasks/TaskList'));
const TaskDetails = React.lazy(() => import('../pages/tasks/TaskDetails'));
const Login = React.lazy(() => import('../pages/auth/Login'));
const Register = React.lazy(() => import('../pages/auth/Register'));
const NotFound = React.lazy(() => import('../pages/NotFound'));

// Loading component
const LoadingScreen: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

// Protected Route wrapper
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const auth = useAuth(); // Get auth context

  if (auth === null) {
    return <Navigate to="/login" replace />;
  }

  const { isAuthenticated, isLoading } = auth;

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Public Route wrapper (accessible only when not authenticated)
interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const auth = useAuth(); // Get auth context

  if (auth === null) {
    return <>{children}</>;
  }

  const { isAuthenticated, isLoading } = auth;

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
        </Route>

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Projects Routes */}
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          
          {/* Tasks Routes */}
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/tasks/:id" element={<TaskDetails />} />
          
          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;