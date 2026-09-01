import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { LoginComponent } from './login';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [provideRouter([])],
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
});
