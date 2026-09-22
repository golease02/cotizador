import { TestBed } from '@angular/core/testing';
import { PdfExportService } from './pdf-export.service';

// Solo se sustituyen los módulos externos (html2canvas / jspdf); el servicio es real.
const mocks = vi.hoisted(() => {
  const canvas = {
    width: 2000,
    height: 3000,
    toDataURL: () => 'data:image/jpeg;base64,AAAA',
  } as unknown as HTMLCanvasElement;

  return {
    canvas,
    html2canvas: vi.fn(async (_element: HTMLElement, _options?: unknown) => canvas),
    addImage: vi.fn(),
    save: vi.fn(),
  };
});

vi.mock('html2canvas', () => ({ default: mocks.html2canvas }));
vi.mock('jspdf', () => ({
  jsPDF: class {
    addImage = mocks.addImage;
    save = mocks.save;
  },
}));

describe('PdfExportService', () => {
  const SHEET_ID = 'official-pdf-sheet';

  const createSheet = (): HTMLElement => {
    const sheet = document.createElement('div');
    sheet.id = SHEET_ID;
    sheet.textContent = 'ARRENDAMIENTO PURO';
    document.body.appendChild(sheet);
    return sheet;
  };

  const captureOptions = () =>
    mocks.html2canvas.mock.calls[0][1] as {
      scale?: number;
      windowWidth?: number;
      width?: number;
    };

  beforeEach(() => {
    mocks.html2canvas.mockClear();
    mocks.addImage.mockClear();
    mocks.save.mockClear();
    TestBed.configureTestingModule({});
  });

  afterEach(() => {
    TestBed.resetTestingModule();
    document.getElementById(SHEET_ID)?.remove();
    document.querySelectorAll('iframe').forEach((frame) => frame.remove());
    document.documentElement.removeAttribute('data-theme');
  });

  it('should not capture anything when the sheet element does not exist', async () => {
    await TestBed.inject(PdfExportService).exportToPdf('hoja-inexistente', 'x');

    expect(mocks.html2canvas).not.toHaveBeenCalled();
    expect(mocks.save).not.toHaveBeenCalled();
  });

  it('should capture the sheet from a desktop-width iframe instead of the device viewport', async () => {
    createSheet();

    await TestBed.inject(PdfExportService).exportToPdf(SHEET_ID, 'cotizacion');

    expect(mocks.html2canvas).toHaveBeenCalledTimes(1);
    const captured = mocks.html2canvas.mock.calls[0][0] as HTMLElement;

    // El clon vive en otro documento (iframe oculto), no en el viewport del dispositivo
    expect(captured.ownerDocument).not.toBe(document);
    // Se fija el ancho canonico de la hoja para que los media queries moviles no apliquen
    expect(captured.style.width).toBe('1000px');
    expect(captureOptions().windowWidth).toBe(1280);
    expect(captureOptions().scale).toBe(2);
    expect(mocks.save).toHaveBeenCalledWith('cotizacion.pdf');
  });

  it('should remove the temporary iframe after the pdf is generated', async () => {
    createSheet();

    await TestBed.inject(PdfExportService).exportToPdf(SHEET_ID, 'cotizacion');

    expect(document.querySelectorAll('iframe').length).toBe(0);
  });

  it('should keep the active theme untouched when generating the pdf', async () => {
    createSheet();
    document.documentElement.setAttribute('data-theme', 'dark');

    await TestBed.inject(PdfExportService).exportToPdf(SHEET_ID, 'cotizacion');

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});
