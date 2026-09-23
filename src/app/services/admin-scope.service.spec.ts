/* ============================================================
   admin-scope.service.spec.ts
   El toggle "Solo mi red" fue eliminado. El super admin ve siempre
   "Todos". Estos tests validan el comportamiento simplificado.
   ============================================================ */
import { TestBed } from '@angular/core/testing';
import { AdminScopeService } from './admin-scope.service';

describe('AdminScopeService', () => {
  function createScope() {
    return TestBed.inject(AdminScopeService);
  }

  it('should always default to the "todos" scope', () => {
    expect(createScope().scope()).toBe('todos');
  });

  it('should report not-red mode (toggle eliminado)', () => {
    expect(createScope().isRedMode()).toBe(false);
  });

  it('should keep an empty seller set', () => {
    expect(createScope().sellerIds().size).toBe(0);
  });

  it('should expose a stable reloadCount (no-op)', () => {
    const scope = createScope();
    expect(scope.reloadCount()).toBeGreaterThan(0);
  });

  it('should report no error', () => {
    expect(createScope().error()).toBeNull();
  });
});

