import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  CheckSquare,
  Users,
  Calendar,
  Settings,
  FolderKanban,
  BarChart2,
  MessagesSquare,
  HelpCircle,
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarProps {
  isOpen: boolean;
}

interface NavItem {
  title: string;
  icon: React.ElementType;
  path: string;
}

const mainNavItems: NavItem[] = [
  { title: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { title: 'Projects', icon: FolderKanban, path: '/projects' },
  { title: 'Tasks', icon: CheckSquare, path: '/tasks' },
  { title: 'Calendar', icon: Calendar, path: '/calendar' },
  { title: 'Team', icon: Users, path: '/team' },
];

const secondaryNavItems: NavItem[] = [
  { title: 'Reports', icon: BarChart2, path: '/reports' },
  { title: 'Messages', icon: MessagesSquare, path: '/messages' },
  { title: 'Settings', icon: Settings, path: '/settings' },
  { title: 'Help', icon: HelpCircle, path: '/help' },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();

  const NavItem = ({ item }: { item: NavItem }) => {
    const isActive = location.pathname === item.path;
    const Icon = item.icon;

    return (
      <NavLink
        to={item.path}
        className={cn(
          'flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors',
          isActive && 'bg-primary text-white hover:bg-primary dark:hover:bg-primary',
          !isOpen && 'justify-center'
        )}
      >
        <Icon
          className={cn(
            'h-5 w-5',
            isActive ? 'text-current' : 'text-gray-500 dark:text-gray-400'
          )}
        />
        {isOpen && <span className="text-sm font-medium">{item.title}</span>}
      </NavLink>
    );
  };

  return (
    <aside
      className={cn(
        'fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white dark:bg-gray-800 border-r dark:border-gray-700 transition-all duration-300 z-40',
        isOpen ? 'w-64' : 'w-16'
      )}
    >
      <div className="flex flex-col h-full p-4">
        <nav className="space-y-1">
          {mainNavItems.map((item) => (
            <NavItem key={item.path} item={item} />
          ))}

          <div className="my-4 border-t dark:border-gray-700" />

          {secondaryNavItems.map((item) => (
            <NavItem key={item.path} item={item} />
          ))}
        </nav>

        {isOpen && (
          <div className="mt-auto">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h5 className="text-sm font-medium mb-2">Need Help?</h5>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Check our documentation or contact support.
              </p>
              <button
                onClick={() => window.open('/help', '_self')}
                className="mt-3 text-xs text-primary hover:underline"
              >
                View Documentation
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
