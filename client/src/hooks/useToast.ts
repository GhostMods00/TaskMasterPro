import { useContext, useCallback } from 'react';
import { ToastContext } from '../context/ToastContext';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastOptions {
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

interface UseToast {
  toast: (message: string, type?: ToastType, options?: ToastOptions) => void;
  success: (message: string, options?: ToastOptions) => void;
  error: (message: string, options?: ToastOptions) => void;
  warning: (message: string, options?: ToastOptions) => void;
  info: (message: string, options?: ToastOptions) => void;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const DEFAULT_DURATION = 5000;

export const useToast = (): UseToast => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  const { addToast, removeToast, removeAll } = context;

  const toast = useCallback(
    (message: string, type: ToastType = 'info', options?: ToastOptions) => {
      addToast(message, type, {
        duration: DEFAULT_DURATION,
        ...options,
      });
    },
    [addToast]
  );

  const success = useCallback(
    (message: string, options?: ToastOptions) => {
      toast(message, 'success', options);
    },
    [toast]
  );

  const error = useCallback(
    (message: string, options?: ToastOptions) => {
      toast(message, 'error', options);
    },
    [toast]
  );

  const warning = useCallback(
    (message: string, options?: ToastOptions) => {
      toast(message, 'warning', options);
    },
    [toast]
  );

  const info = useCallback(
    (message: string, options?: ToastOptions) => {
      toast(message, 'info', options);
    },
    [toast]
  );

  return {
    toast,
    success,
    error,
    warning,
    info,
    dismiss: removeToast,
    dismissAll: removeAll,
  };
};

// Helper functions for toast positioning
export const getToastPosition = (
  position: ToastOptions['position'] = 'bottom-right'
): string => {
  const positions = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
  };

  return positions[position];
};

// Custom hook for managing toast state persistence
export const useToastPersistence = () => {
  const { toast } = useToast();

  const showPersistedToast = useCallback(() => {
    const persistedToast = sessionStorage.getItem('persisted_toast');
    if (persistedToast) {
      const { message, type, options } = JSON.parse(persistedToast);
      toast(message, type, options);
      sessionStorage.removeItem('persisted_toast');
    }
  }, [toast]);

  const persistToast = useCallback(
    (message: string, type: ToastType, options?: ToastOptions) => {
      sessionStorage.setItem(
        'persisted_toast',
        JSON.stringify({ message, type, options })
      );
    },
    []
  );

  return { showPersistedToast, persistToast };
};