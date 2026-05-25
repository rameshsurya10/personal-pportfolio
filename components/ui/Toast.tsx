"use client";
import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

type Variant = "success" | "error";
interface ToastState { id: number; message: string; variant: Variant }
interface ToastContextValue { showToast: (message: string, variant: Variant) => void }

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastState[]>([]);
  const showToast = useCallback((message: string, variant: Variant) => {
    const id = Date.now();
    setToasts((t) => [...t, { id, message, variant }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 5000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div role="status" aria-live="polite" className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        {toasts.map((t) => {
          const indicator = t.variant === "success" ? "✓" : "!";
          return (
            <div
              key={t.id}
              className="rounded-none px-4 py-3 text-sm bg-ink text-surface shadow-[var(--shadow-soft)] flex items-center gap-3"
            >
              <span aria-hidden="true" className="font-mono font-bold shrink-0">{indicator}</span>
              <span>{t.message}</span>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
