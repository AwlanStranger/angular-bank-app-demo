import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AccountService, Account } from '../../core/account';
import { toSignal } from '@angular/core/rxjs-interop';
import { startWith } from 'rxjs/operators';

type Row = { account: string; type: string; to: string; amount: number; at: string };

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './history.html',
})
export class HistoryComponent {
  private accounts = signal<Account[]>([]);

  // 2) Make the filter control reactive via toSignal
  filterCtrl;
  private filterSignal;

  constructor(private accts: AccountService, private fb: FormBuilder) {
    this.accounts.set(this.accts.all());
    this.filterCtrl = this.fb.control('');
    this.filterSignal = toSignal(
      this.filterCtrl.valueChanges.pipe(startWith('')),
      { initialValue: '' }
    );
  }

  // 3) Rows derived from accounts
  rows = computed<Row[]>(() =>
    this.accounts()
      .flatMap(a =>
        a.history.map(h => ({
          account: a.name,
          type: h.kind,
          to: h.to ?? 'N/A',
          amount: h.amount,
          at: h.at,
        }))
      )
      .sort((a, b) => b.at.localeCompare(a.at))
  );

  // 4) Apply the (reactive) filter
  filtered = computed(() => {
    const q = (this.filterSignal() ?? '').toLowerCase().trim();
    if (!q) return this.rows();
    return this.rows().filter(r =>
      r.account.toLowerCase().includes(q) ||
      r.type.toLowerCase().includes(q)
    );
  });
}
