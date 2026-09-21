import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CotizadorComponent } from './cotizador';
import { CatalogService } from '../../services/catalog.service';
import { DEFAULT_CALCULATOR_CONFIG, STATE_PLATES_CATALOG } from '../../models/leasing.model';

/**
 * Flujo de captura completo: formulario -> cotizador -> hoja de cotización.
 * Se simula el catálogo (evita red) y se usan los servicios reales.
 */
describe('CotizadorComponent flujo de captura', () => {
  let fixture: ComponentFixture<CotizadorComponent>;
  let component: CotizadorComponent;

  const setInput = (selector: string, value: string): void => {
    const el = fixture.nativeElement.querySelector(selector) as HTMLInputElement;
    expect(el).toBeTruthy();
    el.value = value;
    el.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  };

  beforeEach(async () => {
    const catalogStub = {
      loadStatePlates: async () => {},
      loadCalculatorConfig: async () => {},
      getStatePlates: () => STATE_PLATES_CATALOG,
      getCalculatorConfig: () => DEFAULT_CALCULATOR_CONFIG,
      statePlates: () => STATE_PLATES_CATALOG,
      calculatorConfig: () => DEFAULT_CALCULATOR_CONFIG,
    };

    await TestBed.configureTestingModule({
      imports: [CotizadorComponent],
      providers: [provideRouter([]), { provide: CatalogService, useValue: catalogStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(CotizadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should recalculate and render the sheet when the vehicle form is filled', () => {
    setInput('#brand', 'VOLKSWAGEN');
    setInput('#model', 'TIGUAN R LINE');
    setInput('#priceNet', '795,790.00');

    expect(component.calculationResult()?.input.priceNet).toBe(795790);
    // El input conserva el formato del cotizador (coma miles, punto centavos)
    const priceInput = fixture.nativeElement.querySelector('#priceNet') as HTMLInputElement;
    expect(priceInput.value).toBe('795,790');
    // La hoja oficial y la banda de comisión se pintan con el formato nuevo
    expect(fixture.nativeElement.querySelector('.official-sheet')).toBeTruthy();
    const texto = (fixture.nativeElement.textContent as string).replace(/\s+/g, ' ');
    expect(texto).toContain('Tu comision para esta operacion seria de:');
    expect(texto).toContain('$ 24,697');
    expect(texto).toContain('Seguro pendiente x cotizar');
  });

  it('should apply the annual insurance cost when "Costo Anual" is selected', () => {
    setInput('#brand', 'VOLKSWAGEN');
    setInput('#model', 'TIGUAN R LINE');
    setInput('#priceNet', '795,790.00');

    const select = fixture.nativeElement.querySelector('#selectSeguro') as HTMLSelectElement;
    select.value = 'anual';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    // El recuadro solo aparece con la opción Costo Anual
    expect(fixture.nativeElement.querySelector('.annual-insurance-group')).toBeTruthy();

    setInput('#annualInsuranceCost', '23200');

    const calc = component.calculationResult();
    expect(calc?.input.isInsuranceEstimated).toBe(false);
    expect(calc?.input.annualInsuranceCost).toBe(23200);
    // 23,200 con IVA -> 20,000 netos dentro del desembolso inicial único
    expect(calc?.options.option1.initialCosts.insuranceNoIva).toBeCloseTo(20000, 2);
    expect(calc?.options.option1.initialCosts.totalInitialPayment).toBeCloseTo(122562.82, 1);
    expect(fixture.nativeElement.textContent).toContain('Costo Anual de Seguro');
  });

  it('should accept any year typed in the open year field', () => {
    setInput('#brand', 'VOLKSWAGEN');
    setInput('#model', 'TIGUAN R LINE');
    setInput('#priceNet', '795,790.00');

    setInput('#year', '2020');
    expect(component.calculationResult()?.input.year).toBe(2020);

    // Sin rangos: años fuera del catálogo anterior (2015-2030) también se aceptan
    setInput('#year', '2035');
    expect(component.calculationResult()?.input.year).toBe(2035);
  });
});
