import { TestBed } from '@angular/core/testing';
import { AdminService } from './admin.service';
import { getSupabaseClient } from './supabase-client';

const diasAtras = (d: number): string => new Date(Date.now() - d * 86_400_000).toISOString();

/** Fila mínima de `get_quotes_activity()` (RPC con scope por rol). */
const fila = (over: Record<string, unknown> = {}): any => ({
  quote_id: 1,
  seller_id: 's1',
  seller_name: 'Ana Vendedora',
  client_name: 'Cliente',
  brand: 'VW',
  model: 'Crafter',
  pricenet: 900_000,
  revisada: false,
  fijada: false,
  created_at: diasAtras(30),
  last_activity: diasAtras(30),
  fecha_cierre: null,
  ...over,
});

describe('AdminService (días sin actividad)', () => {
  let service: AdminService;
  let rpc: any;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminService);
    rpc = vi.spyOn(getSupabaseClient(), 'rpc');
  });

  afterEach(() => {
    TestBed.resetTestingModule();
    vi.restoreAllMocks();
  });

  it('should recolour the dashboard counts with the last activity', async () => {
    const stats = {
      totalSellers: 3,
      totalQuotes: 4,
      totalFijadas: 0,
      totalUrgentes: 99,
      totalPendientes: 99,
      totalRecientes: 99,
      totalRevisadas: 99,
      topVehicles: [],
      topSellers: [],
      fijadas: [],
      urgentes: [],
      recientes: [],
    };
    const filas = [
      fila({ quote_id: 1 }), // 30 días sin actividad → rojo
      fila({ quote_id: 2, last_activity: diasAtras(10) }), // 8–15 → amarillo
      fila({ quote_id: 3, last_activity: diasAtras(1) }), // < 8 → reciente
      fila({ quote_id: 4, last_activity: diasAtras(3), revisada: true }), // revisada → verde
    ];
    rpc.mockImplementation(async (fn: string) =>
      fn === 'get_admin_stats' ? { data: stats, error: null } : { data: filas, error: null },
    );

    const { data } = await service.getStats();

    expect(data.totalUrgentes).toBe(1);
    expect(data.totalPendientes).toBe(1);
    expect(data.totalRecientes).toBe(1);
    expect(data.totalRevisadas).toBe(1);
    expect(data.urgentes.map((q: any) => q.id)).toEqual([1]);
    // Lo que no depende del color sigue viniendo de la RPC.
    expect(data.totalQuotes).toBe(4);
    expect(data.totalSellers).toBe(3);
  });

  it('should keep the RPC payload when the activity RPC is missing', async () => {
    const stats = { totalUrgentes: 7, totalQuotes: 2 };
    rpc.mockImplementation(async (fn: string) =>
      fn === 'get_admin_stats'
        ? { data: stats, error: null }
        : { data: null, error: { code: 'PGRST202', message: 'could not find the function' } },
    );

    const { data } = await service.getStats();

    expect(data).toEqual(stats);
  });

  it('should recolour the seller performance by activity', async () => {
    const payload = {
      period: { days: 30 },
      team: {} as any,
      sellers: [
        {
          id: 's1',
          byColor: { reciente: 0, amarillo: 0, rojo: 9, verde: 0 },
          recentQuotes: [{ id: 1, color: 'rojo' }],
        } as any,
      ],
    };
    rpc.mockImplementation(async (fn: string) =>
      fn === 'get_seller_performance'
        ? { data: payload, error: null }
        : { data: [fila({ quote_id: 1, last_activity: diasAtras(2) })], error: null },
    );

    const { data } = await service.getSellerPerformance(30);

    expect(data!.sellers[0].byColor).toEqual({ reciente: 1, amarillo: 0, rojo: 0, verde: 0 });
    expect(data!.sellers[0].recentQuotes[0].color).toBe('reciente');
  });

  it('should return a reviewed quote to red after 16 days without activity', async () => {
    const stats = { totalUrgentes: 0 };
    rpc.mockImplementation(async (fn: string) =>
      fn === 'get_admin_stats'
        ? { data: stats, error: null }
        : {
            data: [fila({ revisada: true, last_activity: diasAtras(20), created_at: diasAtras(40) })],
            error: null,
          },
    );

    const { data } = await service.getStats();

    expect(data.totalUrgentes).toBe(1);
  });
});
