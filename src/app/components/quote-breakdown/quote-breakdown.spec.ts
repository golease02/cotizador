import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuoteBreakdownComponent } from './quote-breakdown';
import { CatalogService } from '../../services/catalog.service';
import { PdfExportService } from '../../services/pdf-export.service';
import { FinancialCalculatorService } from '../../services/financial-calculator.service';
import {
  DEFAULT_CALCULATOR_CONFIG,
  STATE_PLATES_CATALOG,
  VehicleQuoteInput,
} from '../../models/leasing.model';

/**
 * La hoja oficial debe verse igual en cualquier pantalla: en móvil el componente la
 * reduce con zoom (clase is-fitted) en lugar de re-estilizarla, de modo que el
 * documento quede completo y a escala real, como en escritorio y como el PDF.
 */
describe('QuoteBreakdownComponent ajuste al ancho disponible', () => {
  let fixture: ComponentFixture<QuoteBreakdownComponent>;
  let component: QuoteBreakdownComponent;

  const catalogStub = {
    getCalculatorConfig: () => DEFAULT_CALCULATOR_CONFIG,
    getStatePlates: () => [...STATE_PLATES_CATALOG],
    statePlates: () => [...STATE_PLATES_CATALOG],
    calculatorConfig: () => DEFAULT_CALCULATOR_CONFIG,
  };

  const buildCalculation = () => {
    const input: VehicleQuoteInput = {
      brand: 'VOLKSWAGEN',
      model: 'TIGUAN R LINE',
      year: 2026,
      priceNet: 795790,
      isHybridOrElectric: false,
      termMonths: 48,
      extraordinaryRentPct: 0.1,
      securityDepositPct: 0,
      selectedStatePlateId: 'pendiente',
      isInsuranceEstimated: false,
      customAdminFeeInitial: 3334.5,
    };
    return new FinancialCalculatorService(catalogStub as any).calculateQuote(input);
  };

  const container = (): HTMLElement =>
    fixture.nativeElement.querySelector('.sheet-scroll-container') as HTMLElement;

  const sheet = (): HTMLElement =>
    fixture.nativeElement.querySelector('#official-pdf-sheet') as HTMLElement;

  /** jsdom no calcula el layout: se simula el ancho disponible del contenedor. */
  const setContainerWidth = (width: number): void => {
    Object.defineProperty(container(), 'clientWidth', { configurable: true, value: width });
    component.ngAfterViewInit();
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteBreakdownComponent],
      providers: [
        { provide: CatalogService, useValue: catalogStub },
        { provide: PdfExportService, useValue: { exportToPdf: async () => {} } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(QuoteBreakdownComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('calculation', buildCalculation());
    fixture.detectChanges();
  });

  it('should render the sheet at real scale when there is no measurable container', () => {
    expect(component.isFitted()).toBe(false);
    expect(component.sheetZoom()).toBe(1);
  });

  it('should fit and zoom the sheet when the container is narrower than the desktop width', () => {
    setContainerWidth(400);

    expect(component.isFitted()).toBe(true);
    expect(component.sheetZoom()).toBeCloseTo(0.4, 5);
    expect(container().classList.contains('is-fitted')).toBe(true);
    // El zoom se aplica al documento completo, sin re-estilos de móvil
    expect(sheet().style.zoom).toBe('0.4');
  });

  it('should keep the sheet at real scale on desktop and tablet widths', () => {
    setContainerWidth(1000);
    expect(component.isFitted()).toBe(false);
    expect(component.sheetZoom()).toBe(1);

    setContainerWidth(1280);
    expect(component.isFitted()).toBe(false);
    expect(component.sheetZoom()).toBe(1);
    expect(container().classList.contains('is-fitted')).toBe(false);
  });
});
