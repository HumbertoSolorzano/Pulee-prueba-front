import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastComponent } from '../componentes/toast/toast.component';  // Importa el componente ToastComponent

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'server-error'| 'alert' | 'info';
  icon?: string;
  duration?: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastSubject = new Subject<Toast>();
  toastState$ = this.toastSubject.asObservable();
  private toastId = 0;

  private iconsMap = {
    success: 'assets/imagenes/Toast/icons8-done-120.png',
    error: 'assets/imagenes/Toast/icons8-borrar-mensaje-96.png',
    'server-error': 'assets/imagenes/Toast/icons8-nube-cruz-96.png',
    info: 'assets/imagenes/Toast/icons8-info-96.png',
    alert: 'assets/imagenes/Toast/icons8-alerta-96.png',
  };

  showToast(message: string, type: 'success' | 'error' | 'server-error' | 'alert' | 'info' = 'success', duration = 3000): void {
    const toast: Toast = {
      id: ++this.toastId,
      message,
      type,
      icon: this.iconsMap[type],
      duration
    };
    this.toastSubject.next(toast);
  }
}

