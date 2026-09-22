import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { provideRouter } from '@angular/router';

import { RegisterComponent } from './register';
import { AuthService } from '../../../services/auth.service';

@Component({ template: '' })
class DummyHomeComponent {}

describe('RegisterComponent - contacto OTRO', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  const CESAR_ID = '11111111-2222-3333-4444-555555555555';

  const mockAuthService = {
    getPublicSocios: vi.fn(),
    signUp: vi.fn().mockResolvedValue({ error: null }),
    currentUser: vi.fn().mockReturnValue({ id: 'user-nuevo' }),
    updateProfile: vi.fn().mockResolvedValue({ error: null }),
  };

  const insertNota = vi.fn().mockResolvedValue({ error: null });
  const fakeClient = { from: vi.fn().mockReturnValue({ insert: insertNota }) };

  function llenarFormularioBase() {
    component.phoneNumber = '4421998877';
    component.fullName = 'Vendedor Prueba';
    component.password = 'abc123';
    component.confirmPassword = 'abc123';
    component.agencyBrand = 'TOYOTA';
    component.manualAddress = 'Sucursal Centro';
  }

  beforeEach(async () => {
    mockAuthService.getPublicSocios.mockResolvedValue({ data: [], error: null });
    mockAuthService.signUp.mockClear();
    mockAuthService.updateProfile.mockClear();
    mockAuthService.currentUser.mockClear();
    insertNota.mockClear();

    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [
        provideRouter([{ path: '', component: DummyHomeComponent }]),
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    (component as any).client = fakeClient;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should exigir el texto del contacto when se elige OTRO sin escribir nada', async () => {
    llenarFormularioBase();
    component.contactoGoLease = 'otro';
    component.contactoOtro = '   ';

    await component.onRegister();

    expect(component.errorMessage()).toContain('nombre de tu contacto');
    expect(mockAuthService.signUp).not.toHaveBeenCalled();
    expect(mockAuthService.updateProfile).not.toHaveBeenCalled();
  });

  it('should asignar el asesor por defecto (4421086183) y guardar nota when se elige OTRO con texto', async () => {
    llenarFormularioBase();
    component.contactoGoLease = 'otro';
    component.contactoOtro = 'Juan Perez';
    component.socios.set([
      { id: 'socio-otro-id', full_name: 'Socio Uno', seller_number: '4421000001' },
      { id: CESAR_ID, full_name: 'Cesar Gonzalez', seller_number: '4421086183' },
    ]);
    component.errorMessage.set('');

    await component.onRegister();

    expect(mockAuthService.updateProfile).toHaveBeenCalledWith(
      'user-nuevo',
      expect.objectContaining({ socio_id: CESAR_ID }),
    );

    expect(fakeClient.from).toHaveBeenCalledWith('notas');
    expect(insertNota).toHaveBeenCalledTimes(1);
    const payload = (insertNota.mock.calls[0] as any[])[0][0];
    expect(payload.entidad_tipo).toBe('seller');
    expect(payload.entidad_id).toBe('user-nuevo');
    expect(payload.creado_por).toBe('user-nuevo');
    expect(payload.texto).toContain('OTRO');
    expect(payload.texto).toContain('Juan Perez');
    expect(payload.texto).toContain('Cesar Gonzalez');
  });

  it('should NO guardar nota when se elige un socio de la lista', async () => {
    llenarFormularioBase();
    component.contactoGoLease = 'socio-otro-id';
    component.socios.set([
      { id: 'socio-otro-id', full_name: 'Socio Uno', seller_number: '4421000001' },
    ]);

    await component.onRegister();

    expect(mockAuthService.updateProfile).toHaveBeenCalledWith(
      'user-nuevo',
      expect.objectContaining({ socio_id: 'socio-otro-id' }),
    );
    expect(insertNota).not.toHaveBeenCalled();
  });
});
