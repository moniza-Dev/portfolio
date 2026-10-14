import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error';
  title: string;
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            role="status"
            aria-live="polite"
            className={`pointer-events-auto p-4 rounded-xl shadow-xl border flex items-start gap-3 backdrop-blur-md ${
              toast.type === 'success'
                ? 'bg-neutral-900/95 text-neutral-50 border-neutral-700 dark:bg-neutral-100/95 dark:text-neutral-900 dark:border-neutral-300'
                : 'bg-red-950/90 text-red-50 border-red-800/60'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <h4 className="text-sm font-semibold tracking-wide">{toast.title}</h4>
              <p className="text-xs opacity-80 mt-1">{toast.message}</p>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="opacity-60 hover:opacity-100 p-1 rounded transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
