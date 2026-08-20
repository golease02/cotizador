import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteCalculationResult } from '../../models/leasing.model';

@Component({
  selector: 'app-quote-options',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quote-options.component.html',
  styleUrls: ['./quote-options.component.css']
})
export class QuoteOptionsComponent {
  @Input() calculation!: QuoteCalculationResult | null;
  @Input() selectedOptionKey: 'OPCION_1' | 'OPCION_2' | 'OPCION_3' = 'OPCION_1';
  @Output() optionSelected = new EventEmitter<'OPCION_1' | 'OPCION_2' | 'OPCION_3'>();

  optionKeys: ('OPCION_1' | 'OPCION_2' | 'OPCION_3')[] = ['OPCION_1', 'OPCION_2', 'OPCION_3'];

  getOption(key: string): any {
    if (!this.calculation) return null;
    const map: Record<string, string> = {
      'OPCION_1': 'option1',
      'OPCION_2': 'option2',
      'OPCION_3': 'option3'
    };
    const prop = map[key];
    return this.calculation.options[prop as 'option1' | 'option2' | 'option3'];
  }

  getVR(key: string): string {
    const map: Record<string, string> = {
      'OPCION_1': '35%',
      'OPCION_2': '20%',
      'OPCION_3': '5%'
    };
    return map[key] || '';
  }

  selectOption(key: 'OPCION_1' | 'OPCION_2' | 'OPCION_3'): void {
    this.selectedOptionKey = key;
    this.optionSelected.emit(key);
  }
}