import {
  Component,
  Input,
  Output,
  EventEmitter,
  inject,
  signal,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteCalculationResult } from '../../models/leasing.model';
import { PdfExportService } from '../../services/pdf-export.service';
import { CatalogService } from '../../services/catalog.service';

@Component({
  selector: 'app-quote-breakdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quote-breakdown.html',
  styleUrls: ['./quote-breakdown.css'],
})
export class QuoteBreakdownComponent implements AfterViewInit, OnDestroy {
  /**
   * Ancho canonico de la hoja: coincide con el max-width de .official-sheet (CSS)
   * y con SHEET_RENDER_WIDTH, el ancho con el que PdfExportService genera el PDF.
   */
  private static readonly SHEET_CANONICAL_WIDTH = 1000;
  private pdfExport = inject(PdfExportService);
  private catalog = inject(CatalogService);
  @Input() mostrarGuardar: boolean = true;
  @Input() calculation!: QuoteCalculationResult | null;
  @Input() selectedOptionKey: 'OPCION_1' | 'OPCION_2' | 'OPCION_3' = 'OPCION_1';
  @Output() saveQuote = new EventEmitter<void>();

  public currentDate = new Date();
  public isDownloading = signal(false);

  /** Zoom aplicado a la hoja en pantallas angostas (1 = escala real). */
  public readonly sheetZoom = signal(1);

  /** true cuando la hoja no cabe y se reduce para verse completa, igual que en PC. */
  public readonly isFitted = signal(false);

  @ViewChild('sheetContainer') private sheetContainer?: ElementRef<HTMLElement>;

  private resizeObserver?: ResizeObserver;

  get opt1() {
    return (
      this.calculation?.options?.option1 || {
        initialCosts: {
          extraordinaryRentPct: 0,
          extraordinaryRentNoIva: 0,
          adminFeeInitialNet: 0,
          advisoryFeeNoIva: 0,
          plateRegistrationNoIva: 0,
          insuranceNoIva: 0,
          subtotalNoIva: 0,
          ivaAmount: 0,
          totalInitialPayment: 0,
        },
        monthlyCosts: {
          basicRentNoIva: 0,
          fleetManagementFeeNoIva: 0,
          adminManagementFeeNoIva: 0,
          subtotalNoIva: 0,
          ivaAmount: 0,
          totalMonthlyRentNet: 0,
        },
        residualValue: { percentage: 0, valueNet: 0 },
      }
    );
  }

  get opt2() {
    return (
      this.calculation?.options?.option2 || {
        initialCosts: {
          extraordinaryRentPct: 0,
          extraordinaryRentNoIva: 0,
          adminFeeInitialNet: 0,
          advisoryFeeNoIva: 0,
          plateRegistrationNoIva: 0,
          insuranceNoIva: 0,
          subtotalNoIva: 0,
          ivaAmount: 0,
          totalInitialPayment: 0,
        },
        monthlyCosts: {
          basicRentNoIva: 0,
          fleetManagementFeeNoIva: 0,
          adminManagementFeeNoIva: 0,
          subtotalNoIva: 0,
          ivaAmount: 0,
          totalMonthlyRentNet: 0,
        },
        residualValue: { percentage: 0, valueNet: 0 },
      }
    );
  }

  get opt3() {
    return (
      this.calculation?.options?.option3 || {
        initialCosts: {
          extraordinaryRentPct: 0,
          extraordinaryRentNoIva: 0,
          adminFeeInitialNet: 0,
          advisoryFeeNoIva: 0,
          plateRegistrationNoIva: 0,
          insuranceNoIva: 0,
          subtotalNoIva: 0,
          ivaAmount: 0,
          totalInitialPayment: 0,
        },
        monthlyCosts: {
          basicRentNoIva: 0,
          fleetManagementFeeNoIva: 0,
          adminManagementFeeNoIva: 0,
          subtotalNoIva: 0,
          ivaAmount: 0,
          totalMonthlyRentNet: 0,
        },
        residualValue: { percentage: 0, valueNet: 0 },
      }
    );
  }

  get sheetDate(): Date {
    const g = this.calculation?.generatedAt;
    if (!g) return this.currentDate;

    return g instanceof Date ? g : new Date(g);
  }

  public getPlateLabel(): string {
    if (!this.calculation) return 'Pendiente (Sin placa)';
    const stateId = this.calculation.input.selectedStatePlateId;
    const plates = this.catalog.getStatePlates();
    const found = plates.find((p) => p.id === stateId);
    return found ? found.name : 'Pendiente (Sin placa)';
  }

  /**
   * Etiqueta de la fila de seguro del desglose. Solo cambia cuando el vendedor
   * capturó un "Costo Anual"; el resto conserva los textos históricos.
   */
  public getInsuranceLabel(insuranceNoIva: number): string {
    if (!(insuranceNoIva > 0)) {
      return 'Seguro pendiente x cotizar';
    }
    const annualCost = this.calculation?.input?.annualInsuranceCost || 0;
    return annualCost > 0 ? 'Costo Anual de Seguro' : 'Costo anual de seguro estimado';
  }

  public async downloadPDF(): Promise<void> {
    this.isDownloading.set(true);
    try {
      const model =
        this.calculation?.input?.model?.trim() ||
        this.calculation?.input?.brand?.trim() ||
        'VEHICULO';
      const term = this.calculation?.input?.termMonths || 48;
      const fileName = `COT GO ${model.toUpperCase()} ${term}M`.replace(/[^A-Z0-9 _-]/g, '');
      await this.pdfExport.exportToPdf('official-pdf-sheet', fileName);
    } finally {
      this.isDownloading.set(false);
    }
  }

  public onSaveQuote(): void {
    this.saveQuote.emit();
  }

  public ngAfterViewInit(): void {
    const container = this.sheetContainer?.nativeElement;
    if (!container) return;

    this.updateFit(container.clientWidth);

    if (typeof ResizeObserver === 'undefined') return;
    this.resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      const inlineSize = entry?.contentBoxSize?.[0]?.inlineSize ?? entry?.contentRect?.width;
      if (typeof inlineSize === 'number') this.updateFit(inlineSize);
    });
    this.resizeObserver.observe(container);
  }

  public ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.resizeObserver = undefined;
  }

  /**
   * Ajusta la escala de la hoja segun el ancho disponible: en escritorio se mantiene
   * a escala real (comportamiento historico) y en movil/tablet se reduce para que la
   * cotizacion completa se vea igual que en PC, sin recortes ni estilos compactos.
   */
  private updateFit(containerWidth: number): void {
    if (!(containerWidth > 0)) return;

    const canonical = QuoteBreakdownComponent.SHEET_CANONICAL_WIDTH;
    const zoom = containerWidth < canonical ? containerWidth / canonical : 1;

    if (this.sheetZoom() !== zoom) this.sheetZoom.set(zoom);
    if (this.isFitted() !== zoom < 1) this.isFitted.set(zoom < 1);
  }
}
