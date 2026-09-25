import { QuotesService } from './quotes.service';
import { getSupabaseClient, resetSessionReady, setSessionUser } from './supabase-client';
import type { User } from '@supabase/supabase-js';

describe('QuotesService', () => {
  const client = getSupabaseClient();
  let service: QuotesService;

  beforeEach(() => {
    resetSessionReady();
    setSessionUser({ id: 'admin-1' } as User);
    service = new QuotesService();
  });

  afterEach(() => {
    resetSessionReady();
    vi.restoreAllMocks();
  });

  it('should clean the quote notes through the cascade RPC before deleting the quote', async () => {
    const rpc = vi.spyOn(client, 'rpc').mockResolvedValue({ data: null, error: null } as any);
    const deleteQuery = vi.fn().mockResolvedValue({ error: null });
    const from = vi.spyOn(client, 'from').mockReturnValue({
      delete: () => ({ eq: () => deleteQuery() }),
    } as any);

    const { error } = await service.deleteQuote(42);

    expect(error).toBeNull();
    expect(rpc).toHaveBeenCalledWith('delete_notes_for_quote', { p_quote_id: 42 });
    expect(from).toHaveBeenCalledWith('quotes');
  });

  it('should not delete the quote when the notes cleanup is denied', async () => {
    vi.spyOn(client, 'rpc').mockResolvedValue({
      data: null,
      error: { message: 'No tienes permiso' },
    } as any);
    const from = vi.spyOn(client, 'from');

    const { error } = await service.deleteQuote(42);

    expect(error).toBeTruthy();
    expect(from).not.toHaveBeenCalled();
  });
});
