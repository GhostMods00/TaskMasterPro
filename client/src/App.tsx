import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import ProtectedRoute from './ProtectedRoute';
import Layout from './components/shared/Layout/DashLayout';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import Projects from './pages/projects/ProjectList';
import ProjectDetails from './pages/projects/ProjectDetails';
import Tasks from './pages/tasks/Tasks';
import CalendarPage from './pages/calendar/Calendar';
import Team from './pages/team/Team';
import Reports from './pages/reports/Reports';
import Messages from './pages/messages/Messages';
import Settings from './pages/settings/Settings';
import Help from './pages/help/Help';
import AddProject from './pages/projects/AddProject';
import AddTask from './pages/tasks/AddTask';
import AddEvent from './pages/calendar/AddEvent';
import AddMember from './pages/team/AddMember';
import AddReport from './pages/reports/AddReport';
import NewMessage from './pages/messages/NewMessage';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:id" element={<ProjectDetails />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/team" element={<Team />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/help" element={<Help />} />
                <Route path="/projects/new" element={<AddProject />} />
                <Route path="/tasks/new" element={<AddTask />} />
                <Route path="/calendar/new" element={<AddEvent />} />
                <Route path="/team/new" element={<AddMember />} />
                <Route path="/reports/new" element={<AddReport />} />
                <Route path="/messages/new" element={<NewMessage />} />
              </Route>

              {/* Catch All Route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
