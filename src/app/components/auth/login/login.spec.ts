import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { provideRouter } from '@angular/router';

import { LoginComponent } from './login';
import { AuthService } from '../../../services/auth.service';

@Component({ template: '' })
class DummyHomeComponent {}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const mockAuthService = {
    getProfileBySellerNumber: vi.fn(),
    signIn: vi.fn().mockResolvedValue({ error: null }),
    currentUser: vi.fn().mockReturnValue({ id: 'user-1' }),
    loadProfile: vi.fn().mockResolvedValue({
      id: 'user-1',
      email: 'vendedor_5512345678@golease.com',
      role: 'seller'
    }),
  };

  beforeEach(async () => {
    mockAuthService.getProfileBySellerNumber.mockReset();
    mockAuthService.signIn.mockClear();

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideRouter([{ path: '', component: DummyHomeComponent }]),
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reject phone numbers that are not 10 digits', () => {
    component.phoneNumber = '12345';
    expect(component.validatePhone()).toBe(false);
    expect(component.phoneError).toContain('10 dígitos');
  });

  it('should accept a valid 10 digit phone number', () => {
    component.phoneNumber = '5512345678';
    expect(component.validatePhone()).toBe(true);
    expect(component.phoneError).toBe('');
  });

  it('should reject passwords shorter than 6 characters', () => {
    component.password = 'abc12';
    expect(component.validatePassword()).toBe(false);
    expect(component.passwordError).toContain('al menos 6');
  });

  it('should accept passwords with 6 or more characters', () => {
    component.password = 'abc123';
    expect(component.validatePassword()).toBe(true);
    expect(component.passwordError).toBe('');
  });

  it('should toggle password visibility', () => {
    expect(component.showPassword).toBe(false);
    component.togglePasswordVisibility();
    expect(component.showPassword).toBe(true);
  });

  it('should sign in with profile.email (the auth mirror email), not recovery_email', async () => {
    mockAuthService.getProfileBySellerNumber.mockResolvedValueOnce({
      data: {
        id: 'user-1',
        email: 'vendedor_5512345678@golease.com',
        recovery_email: 'personal@gmail.com',
        role: 'seller',
        active: true
      },
      error: null
    });
    component.phoneNumber = '5512345678';
    component.password = 'abc123';

    await component.onLogin();

    expect(mockAuthService.signIn).toHaveBeenCalledWith(
      'vendedor_5512345678@golease.com',
      'abc123'
    );
    // recovery_email sólo se usa para enviar el enlace de recuperación,
    // jamás para autenticar.
    expect(mockAuthService.signIn).not.toHaveBeenCalledWith(
      'personal@gmail.com',
      expect.anything()
    );
  });

  it('should NOT build a synthetic email like vendedor_${phone}@golease.com', async () => {
    mockAuthService.getProfileBySellerNumber.mockResolvedValueOnce({
      data: {
        id: 'user-1',
        email: 'marcotulio@correo.com',
        recovery_email: null,
        role: 'seller',
        active: true
      },
      error: null
    });
    component.phoneNumber = '5512345678';
    component.password = 'abc123';

    await component.onLogin();

    // Se usa exactamente el email espejo del perfil: no se construye ningún
    // email a partir del rol y el teléfono.
    expect(mockAuthService.signIn).toHaveBeenCalledWith('marcotulio@correo.com', 'abc123');
  });

  it('should show a generic error and not call signIn when profile.email is missing', async () => {
    mockAuthService.getProfileBySellerNumber.mockResolvedValueOnce({
      data: { id: 'user-1', email: '', recovery_email: 'personal@gmail.com', role: 'seller' },
      error: null
    });
    component.phoneNumber = '5512345678';
    component.password = 'abc123';

    await component.onLogin();

    expect(component.errorMessage()).toContain('correo de autenticación');
    expect(mockAuthService.signIn).not.toHaveBeenCalled();
  });

  it('should show generic error when the seller number is not registered', async () => {
    mockAuthService.getProfileBySellerNumber.mockResolvedValueOnce({
      data: null,
      error: { message: 'No encontrado' }
    });
    component.phoneNumber = '5512345678';
    component.password = 'abc123';

    await component.onLogin();

    expect(component.errorMessage()).toBe('Número de celular no registrado.');
    expect(mockAuthService.signIn).not.toHaveBeenCalled();
  });
});
