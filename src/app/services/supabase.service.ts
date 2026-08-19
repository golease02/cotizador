import { Injectable, signal } from '@angular/core';
import { StatePlateOption, STATE_PLATES_CATALOG, QuoteCalculationResult } from '../models/leasing.model';

export interface VehicleCatalogItem {
  id: string;
  brand: string;
  model: string;
  suggestedPriceNet: number;
  isHybridOrElectric: boolean;
  year: number;
}

export const INITIAL_VEHICLES: VehicleCatalogItem[] = [
  { id: 'v0', brand: 'Audi', model: 'Q3 Sportback', suggestedPriceNet: 969900, isHybridOrElectric: false, year: 2026 },
  { id: 'v1', brand: 'HINO', model: '616 LONG', suggestedPriceNet: 407900, isHybridOrElectric: false, year: 2026 },
  { id: 'v2', brand: 'TOYOTA', model: 'HILUX DOBLE CABINA', suggestedPriceNet: 520000, isHybridOrElectric: false, year: 2026 },
  { id: 'v3', brand: 'TOYOTA', model: 'PRIUS HEV', suggestedPriceNet: 485000, isHybridOrElectric: true, year: 2026 },
  { id: 'v4', brand: 'NISSAN', model: 'NP300', suggestedPriceNet: 450000, isHybridOrElectric: false, year: 2026 },
  { id: 'v5', brand: 'BYD', model: 'DOLPHIN MINI EV', suggestedPriceNet: 399800, isHybridOrElectric: true, year: 2026 },
  { id: 'v6', brand: 'FORD', model: 'TRANSIT CUSTOM', suggestedPriceNet: 780000, isHybridOrElectric: false, year: 2026 },
];

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private savedQuotesSignal = signal<QuoteCalculationResult[]>([]);
  public readonly savedQuotes = this.savedQuotesSignal.asReadonly();

  constructor() {
    this.loadFromLocalStorage();
  }

  public getStatePlates(): StatePlateOption[] {
    return STATE_PLATES_CATALOG;
  }

  public getVehicleCatalog(): VehicleCatalogItem[] {
    return INITIAL_VEHICLES;
  }

  public saveQuote(quote: QuoteCalculationResult): void {
    const updated = [quote, ...this.savedQuotesSignal()];
    this.savedQuotesSignal.set(updated);
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem('golease_quotes', JSON.stringify(updated));
      } catch (e) {
        console.warn('LocalStorage error saving quote:', e);
      }
    }
  }

  private loadFromLocalStorage(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const stored = localStorage.getItem('golease_quotes');
        if (stored) {
          const parsed = JSON.parse(stored);
          this.savedQuotesSignal.set(parsed);
        }
      } catch (e) {
        console.warn('LocalStorage load error:', e);
      }
    }
  }
}
