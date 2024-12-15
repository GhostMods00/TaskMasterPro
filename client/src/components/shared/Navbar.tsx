import React from 'react';
import { Menu, Sun, Moon } from 'lucide-react';
import { Button } from '../ui/button';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../context/ThemeContext'; // Fixed import path

interface NavbarProps {
  onMenuClick: () => void;
  isSidebarOpen: boolean;
}

export const Navbar = ({ onMenuClick, isSidebarOpen }: NavbarProps) => {
  const auth = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-background">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <span className="ml-4 text-xl font-semibold">TaskMaster Pro</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            {auth?.user && (
              <>
                <span className="text-sm">{auth.user.email}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => auth.logout?.()}
                >
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;