import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteCalculationResult } from '../../models/leasing.model';
import { PdfExportService } from '../../services/pdf-export.service';
import { CatalogService } from '../../services/catalog.service';

@Component({
  selector: 'app-quote-breakdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quote-breakdown.component.html',
  styleUrls: ['./quote-breakdown.component.css']
})
export class QuoteBreakdownComponent {
  private pdfExport = inject(PdfExportService);
  private catalog = inject(CatalogService);
  @Input() mostrarGuardar: boolean = true;
  @Input() calculation!: QuoteCalculationResult | null;
  @Input() selectedOptionKey: 'OPCION_1' | 'OPCION_2' | 'OPCION_3' = 'OPCION_1';
  @Output() saveQuote = new EventEmitter<void>();

  public currentDate = new Date();
  public isDownloading = false;

  get opt1() {
    return this.calculation?.options?.option1 || {
      initialCosts: { extraordinaryRentPct: 0, extraordinaryRentNoIva: 0, adminFeeInitialNet: 0, advisoryFeeNoIva: 0, plateRegistrationNoIva: 0, insuranceNoIva: 0, subtotalNoIva: 0, ivaAmount: 0, totalInitialPayment: 0 },
      monthlyCosts: { basicRentNoIva: 0, fleetManagementFeeNoIva: 0, adminManagementFeeNoIva: 0, subtotalNoIva: 0, ivaAmount: 0, totalMonthlyRentNet: 0 },
      residualValue: { percentage: 0, valueNet: 0 }
    };
  }

  get opt2() {
    return this.calculation?.options?.option2 || {
      initialCosts: { extraordinaryRentPct: 0, extraordinaryRentNoIva: 0, adminFeeInitialNet: 0, advisoryFeeNoIva: 0, plateRegistrationNoIva: 0, insuranceNoIva: 0, subtotalNoIva: 0, ivaAmount: 0, totalInitialPayment: 0 },
      monthlyCosts: { basicRentNoIva: 0, fleetManagementFeeNoIva: 0, adminManagementFeeNoIva: 0, subtotalNoIva: 0, ivaAmount: 0, totalMonthlyRentNet: 0 },
      residualValue: { percentage: 0, valueNet: 0 }
    };
  }

  get opt3() {
    return this.calculation?.options?.option3 || {
      initialCosts: { extraordinaryRentPct: 0, extraordinaryRentNoIva: 0, adminFeeInitialNet: 0, advisoryFeeNoIva: 0, plateRegistrationNoIva: 0, insuranceNoIva: 0, subtotalNoIva: 0, ivaAmount: 0, totalInitialPayment: 0 },
      monthlyCosts: { basicRentNoIva: 0, fleetManagementFeeNoIva: 0, adminManagementFeeNoIva: 0, subtotalNoIva: 0, ivaAmount: 0, totalMonthlyRentNet: 0 },
      residualValue: { percentage: 0, valueNet: 0 }
    };
  }

  public getPlateLabel(): string {
    if (!this.calculation) return 'Alta de placas pendientes x cotizar';
    const stateId = this.calculation.input.selectedStatePlateId;
    const plates = this.catalog.getStatePlates();
    const found = plates.find(p => p.id === stateId);
    return found ? found.name : 'Alta de placas pendientes x cotizar';
  }

  public async downloadPDF(): Promise<void> {
    this.isDownloading = true;
    try {
      await this.pdfExport.exportToPdf('official-pdf-sheet', 'cotizacion_golease');
    } finally {
      this.isDownloading = false;
    }
  }

  public onSaveQuote(): void {
    this.saveQuote.emit();
  }
}
