import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../../services/supabase.service';

@Component({
  selector: 'app-admin-quotes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-quotes.component.html',
  styleUrls: ['./admin-quotes.component.css']
})
export class AdminQuotesComponent implements OnInit {
  private supabase = inject(SupabaseService);
  quotes = signal<any[]>([]);
  loading = true;

  async ngOnInit() {
    await this.loadQuotes();
  }

  async loadQuotes() {
    this.loading = true;
    const { data, error } = await this.supabase.getAllQuotesWithSeller();
    if (error) {
      console.error('Error loading quotes:', error);
    } else {
      this.quotes.set(data || []);
    }
    this.loading = false;
  }
}