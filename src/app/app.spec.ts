import { SupabaseService } from './services/supabase.service';

describe('SupabaseService', () => {
  let service: SupabaseService;

  beforeEach(() => {
    service = new SupabaseService();
  });

  it('should return initial state plates catalog', () => {
    const plates = service.getStatePlates();
    expect(plates.length).toBeGreaterThan(0);
    expect(plates.find(p => p.id === 'cdmx')?.costNet).toBe(1432);
  });

  it('should return vehicle catalog suggestions including Audi', () => {
    const vehicles = service.getVehicleCatalog();
    expect(vehicles.length).toBeGreaterThan(0);
    expect(vehicles[0].brand).toBe('Audi');
    expect(vehicles[0].model).toBe('Q3 Sportback');
  });
});
