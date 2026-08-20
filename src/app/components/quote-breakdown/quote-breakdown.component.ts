import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteCalculationResult } from '../../models/leasing.model';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-quote-breakdown',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="quote-document-wrapper" *ngIf="calculation">

      <!-- Action Bar (Hidden in Print) -->
      <div class="document-action-bar no-print">
        <div class="action-info">
          <span class="action-badge">Hoja Oficial de Cotización (Formato PDF)</span>
          <span class="action-desc">Muestra el desglose simultáneo de las 3 Opciones</span>
        </div>
        <div class="action-buttons">
          <button class="btn btn-secondary" (click)="onPrint()">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 6 2 18 2 18 9"/>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
              <rect width="12" height="8" x="6" y="14"/>
            </svg>
            Imprimir / Descargar PDF
          </button>
          <button class="btn btn-primary" (click)="onSaveQuote()">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
              <polyline points="17 21 17 13 7 13 7 21"/>
              <polyline points="7 3 7 8 15 8"/>
            </svg>
            Guardar Cotización
          </button>
        </div>
      </div>

      <!-- Printable Official Sheet Container -->
      <div class="sheet-scroll-container">
        <div class="official-sheet" id="official-pdf-sheet">

          <!-- Top Header -->
          <div class="sheet-top-header">
            <h1 class="sheet-main-title">ARRENDAMIENTO PURO</h1>
            <span class="sheet-date">{{ currentDate | date: 'dd/MM/yyyy' }}</span>
          </div>

          <div class="thick-header-line"></div>

          <!-- Vehicle Meta Data Grid -->
          <div class="meta-grid-section">
            <!-- Row 1: Atención a -->
            <div class="meta-row row-1">
              <div class="meta-label-cell">Atención a</div>
              <div class="meta-value-cell full-val">{{ calculation.input.clientName || '' }}</div>
            </div>

            <!-- Row 2: Marca, Modelo, Año -->
            <div class="meta-row row-2">
              <div class="meta-group flex-2">
                <span class="meta-label-cell">Marca</span>
                <span class="meta-value-cell center-text">{{ calculation.input.brand }}</span>
              </div>
              <div class="meta-group flex-3">
                <span class="meta-label-cell">Modelo</span>
                <span class="meta-value-cell center-text">{{ calculation.input.model }}</span>
              </div>
              <div class="meta-group flex-1">
                <span class="meta-label-cell">Año</span>
                <span class="meta-value-cell center-text">{{ calculation.input.year }}</span>
              </div>
            </div>

            <!-- Row 3: Precio Neto, Pesos MN, Hibrido -->
            <div class="meta-row row-3">
              <div class="meta-group flex-4">
                <span class="meta-label-cell">Precio Neto</span>
                <span class="meta-value-cell prefix-symbol">$</span>
                <span class="meta-value-cell price-val">{{ calculation.input.priceNet | number:'1.2-2' }}</span>
                <span class="meta-unit-cell">Pesos MN</span>
              </div>
              <div class="meta-group flex-3">
                <span class="meta-label-cell">¿Es HIBRIDO O ELECTRICO?</span>
                <span class="meta-value-cell center-text uppercase-text">{{ calculation.input.isHybridOrElectric ? 'SI' : 'NO' }}</span>
              </div>
            </div>
          </div>

          <div class="thick-header-line"></div>

          <!-- Main Financial Calculation Table -->
          <table class="financial-table">
            <thead>
              <tr class="table-brand-header-row">
                <th colspan="2" class="th-brand-cell">
                  <div class="brand-plazo-block">
                    <img 
                      src="https://img1.wsimg.com/isteam/ip/b2c8c497-599d-4df4-9ab6-2aaaf690a095/LOGO%20GOLEASE%20SIN%20FONDO.png" 
                      alt="Go Lease Logo" 
                      class="sheet-logo-img"
                    />
                    <div class="plazo-box">
                      <span class="plazo-title">Plazo</span>
                      <span class="plazo-number">{{ calculation.input.termMonths }}</span>
                      <span class="plazo-label">Meses</span>
                    </div>
                  </div>
                </th>
                <th colspan="3" class="opt-header-th">OPCION 1</th>
                <th colspan="3" class="opt-header-th">OPCION 2</th>
                <th colspan="3" class="opt-header-th">OPCION 3</th>
              </tr>
            </thead>
            <tbody>
              <!-- Desembolso inicial único Section -->
              <tr>
                <td class="col-concept">Renta Extraordinaria</td>
                <td class="col-pct">{{ (opt1.initialCosts.extraordinaryRentPct * 100) | number:'1.0-0' }}%</td>
                <td class="col-sym">$</td>
                <td class="col-val">{{ opt1.initialCosts.extraordinaryRentNoIva | number:'1.0-0' }}</td>
                <td class="col-pct">{{ (opt2.initialCosts.extraordinaryRentPct * 100) | number:'1.0-0' }}%</td>
                <td class="col-sym">$</td>
                <td class="col-val">{{ opt2.initialCosts.extraordinaryRentNoIva | number:'1.0-0' }}</td>
                <td class="col-pct">{{ (opt3.initialCosts.extraordinaryRentPct * 100) | number:'1.0-0' }}%</td>
                <td class="col-sym">$</td>
                <td class="col-val">{{ opt3.initialCosts.extraordinaryRentNoIva | number:'1.0-0' }}</td>
              </tr>

              <tr>
                <td class="col-concept" colspan="2">Gastos Administrativos</td>
                <td class="col-sym">$</td>
                <td class="col-val">{{ opt1.initialCosts.adminFeeInitialNet | number:'1.0-0' }}</td>
                <td class="col-sym" colspan="2">$</td>
                <td class="col-val">{{ opt2.initialCosts.adminFeeInitialNet | number:'1.0-0' }}</td>
                <td class="col-sym" colspan="2">$</td>
                <td class="col-val">{{ opt3.initialCosts.adminFeeInitialNet | number:'1.0-0' }}</td>
              </tr>

              <tr>
                <td class="col-concept">Asesoria y gestión Go Lease</td>
                <td class="col-pct">2%</td>
                <td class="col-sym">$</td>
                <td class="col-val">{{ opt1.initialCosts.advisoryFeeNoIva | number:'1.0-0' }}</td>
                <td class="col-pct">2%</td>
                <td class="col-sym">$</td>
                <td class="col-val">{{ opt2.initialCosts.advisoryFeeNoIva | number:'1.0-0' }}</td>
                <td class="col-pct">2%</td>
                <td class="col-sym">$</td>
                <td class="col-val">{{ opt3.initialCosts.advisoryFeeNoIva | number:'1.0-0' }}</td>
              </tr>

              <tr>
                <td class="col-concept" colspan="2">{{ getPlateLabel() }}</td>
                <td class="col-sym">$</td>
                <td class="col-val">{{ opt1.initialCosts.plateRegistrationNoIva > 0 ? (opt1.initialCosts.plateRegistrationNoIva | number:'1.0-0') : '-' }}</td>
                <td class="col-sym" colspan="2">$</td>
                <td class="col-val">{{ opt2.initialCosts.plateRegistrationNoIva > 0 ? (opt2.initialCosts.plateRegistrationNoIva | number:'1.0-0') : '-' }}</td>
                <td class="col-sym" colspan="2">$</td>
                <td class="col-val">{{ opt3.initialCosts.plateRegistrationNoIva > 0 ? (opt3.initialCosts.plateRegistrationNoIva | number:'1.0-0') : '-' }}</td>
              </tr>

              <tr>
                <td class="col-concept" colspan="2">{{ opt1.initialCosts.insuranceNoIva > 0 ? 'Costo anual de seguro estimado' : 'Seguro pendiente x cotizar' }}</td>
                <td class="col-sym">$</td>
                <td class="col-val">{{ opt1.initialCosts.insuranceNoIva > 0 ? (opt1.initialCosts.insuranceNoIva | number:'1.0-0') : '-' }}</td>
                <td class="col-sym" colspan="2">$</td>
                <td class="col-val">{{ opt2.initialCosts.insuranceNoIva > 0 ? (opt2.initialCosts.insuranceNoIva | number:'1.0-0') : '-' }}</td>
                <td class="col-sym" colspan="2">$</td>
                <td class="col-val">{{ opt3.initialCosts.insuranceNoIva > 0 ? (opt3.initialCosts.insuranceNoIva | number:'1.0-0') : '-' }}</td>
              </tr>

              <tr class="row-subtotal">
                <td class="col-concept" colspan="2">Subtotal</td>
                <td class="col-sym">$</td>
                <td class="col-val">{{ opt1.initialCosts.subtotalNoIva | number:'1.0-0' }}</td>
                <td class="col-sym" colspan="2">$</td>
                <td class="col-val">{{ opt2.initialCosts.subtotalNoIva | number:'1.0-0' }}</td>
                <td class="col-sym" colspan="2">$</td>
                <td class="col-val">{{ opt3.initialCosts.subtotalNoIva | number:'1.0-0' }}</td>
              </tr>

              <tr class="row-iva">
                <td class="col-concept" colspan="2">IVA</td>
                <td class="col-sym">$</td>
                <td class="col-val">{{ opt1.initialCosts.ivaAmount | number:'1.0-0' }}</td>
                <td class="col-sym" colspan="2">$</td>
                <td class="col-val">{{ opt2.initialCosts.ivaAmount | number:'1.0-0' }}</td>
                <td class="col-sym" colspan="2">$</td>
                <td class="col-val">{{ opt3.initialCosts.ivaAmount | number:'1.0-0' }}</td>
              </tr>

              <tr class="row-total-section">
                <td class="col-concept-bold" colspan="2">Desembolso inicial único</td>
                <td class="col-sym-bold">$</td>
                <td class="col-val-bold">{{ opt1.initialCosts.totalInitialPayment | number:'1.0-0' }}</td>
                <td class="col-sym-bold" colspan="2">$</td>
                <td class="col-val-bold">{{ opt2.initialCosts.totalInitialPayment | number:'1.0-0' }}</td>
                <td class="col-sym-bold" colspan="2">$</td>
                <td class="col-val-bold">{{ opt3.initialCosts.totalInitialPayment | number:'1.0-0' }}</td>
              </tr>

              <!-- Spacer Row -->
              <tr class="spacer-row"><td colspan="11"></td></tr>

              <!-- Renta mensual neta Section -->
              <tr>
                <td class="col-concept" colspan="2">Renta mensual básica</td>
                <td class="col-sym">$</td>
                <td class="col-val">{{ opt1.monthlyCosts.basicRentNoIva | number:'1.0-0' }}</td>
                <td class="col-sym" colspan="2">$</td>
                <td class="col-val">{{ opt2.monthlyCosts.basicRentNoIva | number:'1.0-0' }}</td>
                <td class="col-sym" colspan="2">$</td>
                <td class="col-val">{{ opt3.monthlyCosts.basicRentNoIva | number:'1.0-0' }}</td>
              </tr>

              <tr>
                <td class="col-concept" colspan="2">Gastos Admon de Flotilla</td>
                <td class="col-sym">$</td>
                <td class="col-val">{{ opt1.monthlyCosts.fleetManagementFeeNoIva | number:'1.0-0' }}</td>
                <td class="col-sym" colspan="2">$</td>
                <td class="col-val">{{ opt2.monthlyCosts.fleetManagementFeeNoIva | number:'1.0-0' }}</td>
                <td class="col-sym" colspan="2">$</td>
                <td class="col-val">{{ opt3.monthlyCosts.fleetManagementFeeNoIva | number:'1.0-0' }}</td>
              </tr>

              <tr>
                <td class="col-concept" colspan="2">Gastos Administrativos</td>
                <td class="col-sym">$</td>
                <td class="col-val">{{ opt1.monthlyCosts.adminManagementFeeNoIva | number:'1.0-0' }}</td>
                <td class="col-sym" colspan="2">$</td>
                <td class="col-val">{{ opt2.monthlyCosts.adminManagementFeeNoIva | number:'1.0-0' }}</td>
                <td class="col-sym" colspan="2">$</td>
                <td class="col-val">{{ opt3.monthlyCosts.adminManagementFeeNoIva | number:'1.0-0' }}</td>
              </tr>

              <tr class="row-subtotal">
                <td class="col-concept" colspan="2">Subtotal</td>
                <td class="col-sym">$</td>
                <td class="col-val">{{ opt1.monthlyCosts.subtotalNoIva | number:'1.0-0' }}</td>
                <td class="col-sym" colspan="2">$</td>
                <td class="col-val">{{ opt2.monthlyCosts.subtotalNoIva | number:'1.0-0' }}</td>
                <td class="col-sym" colspan="2">$</td>
                <td class="col-val">{{ opt3.monthlyCosts.subtotalNoIva | number:'1.0-0' }}</td>
              </tr>

              <tr class="row-iva">
                <td class="col-concept" colspan="2">IVA</td>
                <td class="col-sym">$</td>
                <td class="col-val">{{ opt1.monthlyCosts.ivaAmount | number:'1.0-0' }}</td>
                <td class="col-sym" colspan="2">$</td>
                <td class="col-val">{{ opt2.monthlyCosts.ivaAmount | number:'1.0-0' }}</td>
                <td class="col-sym" colspan="2">$</td>
                <td class="col-val">{{ opt3.monthlyCosts.ivaAmount | number:'1.0-0' }}</td>
              </tr>

              <tr class="row-total-section">
                <td class="col-concept-bold" colspan="2">Renta mensual neta</td>
                <td class="col-sym-bold">$</td>
                <td class="col-val-bold">{{ opt1.monthlyCosts.totalMonthlyRentNet | number:'1.0-0' }}</td>
                <td class="col-sym-bold" colspan="2">$</td>
                <td class="col-val-bold">{{ opt2.monthlyCosts.totalMonthlyRentNet | number:'1.0-0' }}</td>
                <td class="col-sym-bold" colspan="2">$</td>
                <td class="col-val-bold">{{ opt3.monthlyCosts.totalMonthlyRentNet | number:'1.0-0' }}</td>
              </tr>

              <!-- Spacer Row -->
              <tr class="spacer-row"><td colspan="11"></td></tr>

              <!-- Valor residual Section -->
              <tr class="row-vr-section">
                <td class="col-concept-bold">Valor residual Neto</td>
                <td class="col-pct-vr">35%</td>
                <td class="col-sym-bold">$</td>
                <td class="col-val-bold">{{ opt1.residualValue.valueNet | number:'1.0-0' }}</td>
                <td class="col-pct-vr">20%</td>
                <td class="col-sym-bold">$</td>
                <td class="col-val-bold">{{ opt2.residualValue.valueNet | number:'1.0-0' }}</td>
                <td class="col-pct-vr">5%</td>
                <td class="col-sym-bold">$</td>
                <td class="col-val-bold">{{ opt3.residualValue.valueNet | number:'1.0-0' }}</td>
              </tr>

            </tbody>
          </table>

          <!-- Considerations Footer Block -->
          <div class="thick-footer-line"></div>

          <div class="sheet-considerations">
            <div class="considerations-header">Consideraciones:</div>
            <ul class="considerations-bullet-list">
              <li>* Cotización sujeta a cambios sin previo aviso. Vigencia 7 días a partir de su elaboración.</li>
              <li>* Las Rentas Extraordinarias son como un enganche 100% deducible y se pueden modificar para ajustarse a su presupuesto.</li>
              <li>* Las Rentas mensuales son 100% deducibles por los conceptos con que se emite y no solo por los que dicta la Ley de ISR.</li>
              <li>* Opción de contar con placas de otros Estados para ahorrar el pago de tenencias.</li>
              <li>* Los costos de placas podrían ser ajustados, en caso de aplicar pago de tenencias y/o derechos.</li>
              <li>* Al finalizar el plazo puedes: Regresarlo / Adquirirlo / Renovarlo por uno nuevo / Te lo compramos para que obtengas una ganancia extra.</li>
              <li>* La asesoria y gestión operativa de Go Lease deberá ser cubierta previa a la elaboración de contratos.</li>
            </ul>
          </div>

          <div class="sheet-footer-slogan">
            <span>TENEMOS CONVENIOS CON TODAS LAS MARCAS</span>
          </div>

        </div>
      </div>

    </div>
  `,
  styles: [`
    .quote-document-wrapper {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      width: 100%;
    }

    .document-action-bar {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 1rem 1.25rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }

    .action-info {
      display: flex;
      flex-direction: column;
    }

    .action-badge {
      font-family: 'Fjalla One', sans-serif;
      font-size: 1.05rem;
      color: #15803d;
      letter-spacing: 0.5px;
    }

    .action-desc {
      font-size: 0.8rem;
      color: #64748b;
    }

    .action-buttons {
      display: flex;
      gap: 0.75rem;
    }

    .btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.6rem 1.1rem;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 700;
      cursor: pointer;
      border: none;
      transition: all 0.2s ease;
    }

    .btn-primary {
      background: linear-gradient(135deg, #15803d 0%, #20b038 100%);
      color: #ffffff;
      box-shadow: 0 4px 12px rgba(32, 176, 56, 0.35);
    }

    .btn-secondary {
      background: #ffffff;
      color: #111827;
      font-weight: 800;
      border: 1px solid #d1d5db;
      box-shadow: 0 2px 6px rgba(0,0,0,0.08);
    }

    .btn-secondary:hover {
      background: #f8fafc;
    }

    /* Scrollable Container for Official Sheet */
    .sheet-scroll-container {
      width: 100%;
      overflow-x: auto;
      border-radius: 8px;
    }

    /* ------------------------------------------------------------- */
    /* OFFICIAL PRINTABLE SHEET (Fluid Responsive 1:1 Scale)        */
    /* ------------------------------------------------------------- */
    .official-sheet {
      background: #ffffff;
      color: #000000;
      font-family: Arial, Helvetica, sans-serif;
      padding: 2.25rem 2.5rem;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
      width: 100%;
      min-width: 720px;
      max-width: 1000px;
      margin: 0 auto;
      box-sizing: border-box;
    }

    .sheet-top-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding-bottom: 0.3rem;
    }

    .sheet-main-title {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 1.45rem;
      font-weight: 900;
      color: #000000;
      margin: 0;
      letter-spacing: 0.5px;
    }

    .sheet-date {
      font-size: 1.1rem;
      font-weight: 700;
      color: #000000;
    }

    .thick-header-line {
      height: 3px;
      background-color: #000000;
      margin-bottom: 1rem;
    }

    /* Meta Grid */
    .meta-grid-section {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 1rem;
      font-size: 0.9rem;
    }

    .meta-row {
      display: flex;
      align-items: center;
      gap: 0.65rem;
    }

    .meta-group {
      display: flex;
      align-items: center;
      gap: 0.35rem;
    }

    .flex-1 { flex: 1; }
    .flex-2 { flex: 2; }
    .flex-3 { flex: 3; }
    .flex-4 { flex: 4; }

    .meta-label-cell {
      font-size: 0.85rem;
      color: #000000;
      font-weight: 500;
      white-space: nowrap;
    }

    .meta-value-cell {
      background-color: #e5e7eb;
      border: 1px solid #9ca3af;
      padding: 0.25rem 0.6rem;
      font-size: 0.9rem;
      font-weight: 700;
      color: #000000;
      min-height: 20px;
    }

    .full-val {
      flex: 1;
    }

    .center-text {
      text-align: center;
      width: 100%;
    }

    .uppercase-text {
      text-transform: uppercase;
    }

    .prefix-symbol {
      background-color: #e5e7eb;
      border: 1px solid #9ca3af;
      border-right: none;
      padding: 0.25rem 0.4rem;
      font-weight: 700;
    }

    .price-val {
      border-left: none;
      width: 130px;
      text-align: right;
    }

    .meta-unit-cell {
      font-size: 0.85rem;
      margin-left: 0.2rem;
    }

    /* Financial Table Styling with Clean Column Proportions */
    .financial-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
      color: #000000;
      table-layout: fixed;
    }

    .table-brand-header-row th {
      padding-bottom: 0.75rem;
      border: none;
      vertical-align: bottom;
    }

    .th-brand-cell {
      text-align: left;
      width: 34%;
    }

    .brand-plazo-block {
      display: flex;
      align-items: flex-end;
      gap: 1.25rem;
    }

    .sheet-logo-img {
      height: 65px;
      width: auto;
      object-fit: contain;
    }

    .plazo-box {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 1rem;
    }

    .plazo-title {
      font-weight: 500;
    }

    .plazo-number {
      background-color: #e5e7eb;
      border: 1px solid #9ca3af;
      padding: 0.15rem 0.6rem;
      font-weight: 700;
    }

    .plazo-label {
      font-weight: 500;
    }

    .opt-header-th {
      width: 22%;
      text-align: center;
      font-family: Arial, Helvetica, sans-serif;
      font-weight: 900;
      font-size: 1.05rem;
      color: #000000;
    }

    .financial-table td {
      padding: 0.22rem 0.15rem;
      vertical-align: middle;
    }

    .col-concept {
      font-weight: 400;
      color: #000000;
      width: 30%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .col-concept-bold {
      font-weight: 900;
      font-size: 0.975rem;
      color: #000000;
      width: 30%;
    }

    .col-pct {
      background-color: #e5e7eb;
      border: 1px solid #d1d5db;
      text-align: center;
      font-weight: 700;
      font-size: 0.8rem;
      width: 4%;
    }

    .col-pct-vr {
      font-weight: 700;
      font-size: 0.875rem;
      text-align: right;
      padding-right: 0.4rem;
      width: 4%;
    }

    .col-sym {
      text-align: right;
      padding-right: 0.15rem;
      width: 3%;
    }

    .col-sym-bold {
      text-align: right;
      padding-right: 0.15rem;
      font-weight: 900;
      font-size: 1rem;
      width: 3%;
    }

    .col-val {
      text-align: right;
      padding-right: 0.75rem;
      width: 15%;
      font-family: Arial, Helvetica, sans-serif;
    }

    .col-val-bold {
      text-align: right;
      padding-right: 0.75rem;
      font-weight: 900;
      font-size: 1.05rem;
      width: 15%;
      font-family: Arial, Helvetica, sans-serif;
    }

    .row-subtotal td {
      padding-top: 0.35rem;
    }

    .row-total-section td {
      padding-top: 0.35rem;
      padding-bottom: 0.35rem;
      border-top: 2px solid #000000;
      border-bottom: 2px solid #000000;
    }

    .row-vr-section td {
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
    }

    .spacer-row td {
      height: 10px;
    }

    /* Considerations */
    .thick-footer-line {
      height: 3px;
      background-color: #000000;
      margin-top: 0.85rem;
      margin-bottom: 0.65rem;
    }

    .sheet-considerations {
      font-size: 0.75rem;
      color: #000000;
      line-height: 1.35;
      margin-bottom: 1.25rem;
    }

    .considerations-header {
      font-weight: 700;
      margin-bottom: 0.2rem;
    }

    .considerations-bullet-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .considerations-bullet-list li {
      margin-bottom: 0.12rem;
    }

    .sheet-footer-slogan {
      text-align: center;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 1rem;
      font-weight: 900;
      letter-spacing: 1px;
      color: #000000;
      margin-top: 1rem;
      text-transform: uppercase;
    }

    /* ------------------------------------------------------------- */
    /* PRINT MEDIA ADJUSTMENTS                                      */
    /* ------------------------------------------------------------- */
    @media print {
      .no-print {
        display: none !important;
      }
      .sheet-scroll-container {
        overflow: visible !important;
      }
      .official-sheet {
        box-shadow: none !important;
        border: none !important;
        padding: 0 !important;
        max-width: 100% !important;
        min-width: 100% !important;
        margin: 0 !important;
      }
      @page {
        size: letter portrait;
        margin: 0.8cm;
      }
    }
  `]
})
export class QuoteBreakdownComponent {
  private supabase = inject(SupabaseService);

  @Input() calculation!: QuoteCalculationResult | null;
  @Input() selectedOptionKey: 'OPCION_1' | 'OPCION_2' | 'OPCION_3' = 'OPCION_1';
  @Output() saveQuote = new EventEmitter<void>();

  public currentDate = new Date();

  get opt1() {
    return this.calculation!.options.option1;
  }

  get opt2() {
    return this.calculation!.options.option2;
  }

  get opt3() {
    return this.calculation!.options.option3;
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

  public onSaveQuote(): void {
    this.saveQuote.emit();
  }
}
