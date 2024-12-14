import React, { createContext, useCallback, useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '../lib/utils';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  addToast: (message: string, type: ToastType, options?: { duration?: number; action?: Toast['action'] }) => void;
  removeToast: (id: string) => void;
  removeAll: () => void;
}

export const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType, options?: { duration?: number; action?: Toast['action'] }) => {
    const id = Math.random().toString(36).substring(2, 9);
    const toast: Toast = {
      id,
      message,
      type,
      duration: options?.duration ?? 5000,
      action: options?.action,
    };

    setToasts((currentToasts) => [...currentToasts, toast]);

    if (toast.duration !== Infinity) {
      setTimeout(() => removeToast(id), toast.duration);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
  }, []);

  const removeAll = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast, removeAll }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              "min-w-[300px] rounded-lg p-4 shadow-lg",
              "animate-in slide-in-from-right-full duration-300",
              {
                'bg-green-100 text-green-800': toast.type === 'success',
                'bg-red-100 text-red-800': toast.type === 'error',
                'bg-yellow-100 text-yellow-800': toast.type === 'warning',
                'bg-blue-100 text-blue-800': toast.type === 'info',
              }
            )}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{toast.message}</p>
              <button
                onClick={() => removeToast(toast.id)}
                className="ml-4 inline-flex rounded-md p-1.5 hover:bg-black/10 focus:outline-none"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {toast.action && (
              <button
                onClick={toast.action.onClick}
                className="mt-2 text-sm font-medium hover:underline"
              >
                {toast.action.label}
              </button>
            )}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};