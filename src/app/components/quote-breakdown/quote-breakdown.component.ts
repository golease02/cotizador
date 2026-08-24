import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteCalculationResult } from '../../models/leasing.model';
import { SupabaseService } from '../../services/supabase.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-quote-breakdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quote-breakdown.component.html',
  styleUrls: ['./quote-breakdown.component.css']
})
export class QuoteBreakdownComponent {
  private supabase = inject(SupabaseService);
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
      residualValue: { valueNet: 0 }
    };
  }

  get opt2() {
    return this.calculation?.options?.option2 || {
      initialCosts: { extraordinaryRentPct: 0, extraordinaryRentNoIva: 0, adminFeeInitialNet: 0, advisoryFeeNoIva: 0, plateRegistrationNoIva: 0, insuranceNoIva: 0, subtotalNoIva: 0, ivaAmount: 0, totalInitialPayment: 0 },
      monthlyCosts: { basicRentNoIva: 0, fleetManagementFeeNoIva: 0, adminManagementFeeNoIva: 0, subtotalNoIva: 0, ivaAmount: 0, totalMonthlyRentNet: 0 },
      residualValue: { valueNet: 0 }
    };
  }

  get opt3() {
    return this.calculation?.options?.option3 || {
      initialCosts: { extraordinaryRentPct: 0, extraordinaryRentNoIva: 0, adminFeeInitialNet: 0, advisoryFeeNoIva: 0, plateRegistrationNoIva: 0, insuranceNoIva: 0, subtotalNoIva: 0, ivaAmount: 0, totalInitialPayment: 0 },
      monthlyCosts: { basicRentNoIva: 0, fleetManagementFeeNoIva: 0, adminManagementFeeNoIva: 0, subtotalNoIva: 0, ivaAmount: 0, totalMonthlyRentNet: 0 },
      residualValue: { valueNet: 0 }
    };
  }

  public getPlateLabel(): string {
    if (!this.calculation) return 'Alta de placas pendientes x cotizar';
    const stateId = this.calculation.input.selectedStatePlateId;
    const plates = this.supabase.getStatePlates();
    const found = plates.find(p => p.id === stateId);
    return found ? found.name : 'Alta de placas pendientes x cotizar';
  }

  public onPrint(): void {
    window.print();
  }

  public async downloadPDF(): Promise<void> {
    this.isDownloading = true;
    try {
      const element = document.getElementById('official-pdf-sheet');
      if (!element) {
        console.error('No se encontró el elemento para generar PDF');
        this.isDownloading = false;
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        allowTaint: false,
        width: element.scrollWidth,
        height: element.scrollHeight
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('cotizacion_golease.pdf');
    } catch (error) {
      console.error('Error al generar PDF:', error);
    } finally {
      this.isDownloading = false;
    }
  }

  public onSaveQuote(): void {
    this.saveQuote.emit();
  }
}