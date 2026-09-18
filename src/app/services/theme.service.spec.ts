import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

const STORAGE_KEY = 'cotizador-theme';

// Solo se prueba la lógica del tema (localStorage + atributo data-theme del documento).
describe('ThemeService', () => {
  const createService = () => {
    const service = TestBed.inject(ThemeService);
    TestBed.tick();
    return service;
  };

  beforeEach(() => {
    localStorage.removeItem(STORAGE_KEY);
    document.documentElement.removeAttribute('data-theme');
    TestBed.configureTestingModule({});
  });

  afterEach(() => {
    TestBed.resetTestingModule();
    localStorage.removeItem(STORAGE_KEY);
    document.documentElement.removeAttribute('data-theme');
  });

  it('should default to dark when there is no stored preference', () => {
    expect(createService().theme()).toBe('dark');
  });

  it('should apply the dark theme to the document element', () => {
    createService();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('should respect a stored light preference', () => {
    localStorage.setItem(STORAGE_KEY, 'light');
    const service = createService();
    expect(service.theme()).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('should respect a stored dark preference', () => {
    localStorage.setItem(STORAGE_KEY, 'dark');
    expect(createService().theme()).toBe('dark');
  });

  it('should ignore an invalid stored value and fall back to dark', () => {
    localStorage.setItem(STORAGE_KEY, 'azul');
    expect(createService().theme()).toBe('dark');
  });

  it('should toggle between dark and light', () => {
    const service = createService();
    expect(service.theme()).toBe('dark');

    service.toggle();
    expect(service.theme()).toBe('light');

    service.toggle();
    expect(service.theme()).toBe('dark');
  });

  it('should persist the selected theme and keep it after a reload', () => {
    const service = createService();
    service.toggle();
    TestBed.tick();
    expect(localStorage.getItem(STORAGE_KEY)).toBe('light');

    // "Recarga": un servicio nuevo debe respetar la elección guardada.
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    expect(createService().theme()).toBe('light');
  });
});
