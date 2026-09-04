import { currentUserSignal } from './services/supabase-client';
import { AuthService } from './services/auth.service';

describe('AuthService security checks', () => {
  let service: AuthService;

  beforeEach(() => {
    service = new AuthService();
    currentUserSignal.set(null);
    service['currentProfileSignal'].set(null);
  });

  it('should deny editing another user profile without admin role', () => {
    currentUserSignal.set({ id: 'user-1' } as any);
    service['currentProfileSignal'].set({ id: 'user-1', role: 'seller', email: 'seller@test.com', full_name: 'Seller' } as any);

    expect(service.canManageProfile('user-2')).toBe(false);
  });

  it('should allow editing own profile', () => {
    currentUserSignal.set({ id: 'user-1' } as any);
    service['currentProfileSignal'].set({ id: 'user-1', role: 'seller', email: 'seller@test.com', full_name: 'Seller' } as any);

    expect(service.canManageProfile('user-1')).toBe(true);
  });

  it('should sanitize unsafe string content to prevent code injection', () => {
    expect(service.sanitizeText('<script>alert(1)</script>', 'content', 200)).toBe('');
    expect(service.sanitizeText('  Nombre válido  ', 'full_name', 50)).toBe('Nombre válido');
  });
});
