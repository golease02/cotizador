import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  type: 'success' | 'error' | 'info';
  message: string;
  actionLabel?: string;
  action?: () => void;
}

let toastCounter = 0;

/**
 * Servicio global de notificaciones tipo "toast".
 * Sustituye a los alert() nativos y a los mensajes internos de los formularios.
 */
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly toastsSignal = signal<Toast[]>([]);
  readonly toasts = this.toastsSignal.asReadonly();

  private push(toast: Toast, duration: number): void {
    this.toastsSignal.update((list) => [...list, toast]);
    if (duration > 0) {
      setTimeout(() => this.dismiss(toast.id), duration);
    }
  }

  success(message: string, duration = 4200): void {
    this.push({ id: ++toastCounter, type: 'success', message }, duration);
  }

  error(message: string, duration = 6500): void {
    this.push({ id: ++toastCounter, type: 'error', message }, duration);
  }

  info(message: string, duration = 4000): void {
    this.push({ id: ++toastCounter, type: 'info', message }, duration);
  }

  /** Toast con acción de deshacer (por ejemplo, para el toggle de estado). */
  undo(message: string, action: () => void, duration = 8000): void {
    this.push({ id: ++toastCounter, type: 'info', message, actionLabel: 'Deshacer', action }, duration);
  }

  dismiss(id: number): void {
    this.toastsSignal.update((list) => list.filter((t) => t.id !== id));
  }
}