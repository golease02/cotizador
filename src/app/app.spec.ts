import { signal } from '@angular/core';
import { SupabaseService } from './services/supabase.service';

describe('SupabaseService security checks', () => {
  let service: SupabaseService;

  beforeEach(() => {
    service = new SupabaseService();
  });

  it('should deny editing another user profile without admin role', () => {
    service['currentUserSignal'].set({ id: 'user-1' } as any);
    service['currentProfileSignal'].set({ id: 'user-1', role: 'seller', email: 'seller@test.com', full_name: 'Seller' } as any);

    expect(service.canManageProfile('user-2')).toBe(false);
  });

  it('should sanitize unsafe string content to prevent code injection', () => {
    expect(service.sanitizeText('<script>alert(1)</script>', 'content', 200)).toBe('');
    expect(service.sanitizeText('  Nombre válido  ', 'full_name', 50)).toBe('Nombre válido');
  });
});
