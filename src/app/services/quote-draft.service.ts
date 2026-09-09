import { Injectable, signal } from '@angular/core';
import { VehicleQuoteInput } from '../models/leasing.model';

export interface QuoteDraft {
  /** Datos del vehículo para precargar el formulario del cotizador. */
  input: VehicleQuoteInput;
  /** Si existe, la cotización se edita (el autosave actualiza el mismo registro). */
  quoteId?: number;
  /** Fecha de vencimiento de la cotización original (solo para edición). */
  validUntil?: string;
}

const STORAGE_KEY = 'golease_quote_draft';

/**
 * Guarda en memoria (y en sessionStorage como respaldo) la cotización que se
 * quiere "Duplicar" o "Editar" desde Mis Cotizaciones, para que el cotizador
 * la precargue al navegar a /cotizador.
 */
@Injectable({
  providedIn: 'root',
})
export class QuoteDraftService {
  private readonly draftSignal = signal<QuoteDraft | null>(this.readFromStorage());
  readonly draft = this.draftSignal.asReadonly();

  setDraft(input: VehicleQuoteInput, quoteId?: number, validUntil?: string): void {
    const draft: QuoteDraft = { input: { ...input }, quoteId, validUntil };
    this.draftSignal.set(draft);
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch {
      // Almacenamiento no disponible (modo incógnito / bloqueado): la señal en memoria basta.
    }
  }

  clear(): void {
    this.draftSignal.set(null);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Almacenamiento no disponible; solo se limpia la señal en memoria.
    }
  }

  private readFromStorage(): QuoteDraft | null {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as QuoteDraft;
      return parsed?.input ? parsed : null;
    } catch {
      return null;
    }
  }
}