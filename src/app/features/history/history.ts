import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AccountService, Account } from '../../core/account';

type Row = { account: string; type: string; amount: number; at: string };

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './history.html',
})
export class HistoryComponent {
  // raw accounts
  private accounts = signal<Account[]>([]);

  // simple text filter
  filter;

  // flatten account histories into table rows
  rows = computed<Row[]>(() =>
    this.accounts().flatMap(a =>
      a.history.map(h => ({
        account: a.name,
        type: h.kind,
        amount: h.amount,
        at: h.at,
      }))
    ).sort((a, b) => b.at.localeCompare(a.at))
  );

  filtered = computed(() => {
    const q = (this.filter.value ?? '').toLowerCase().trim();
    if (!q) return this.rows();
    return this.rows().filter(r =>
      r.account.toLowerCase().includes(q) ||
      r.type.toLowerCase().includes(q)
    );
  });

  constructor(private accts: AccountService, private fb: FormBuilder) {
    this.accounts.set(this.accts.all());
    this.filter = this.fb.control('');
  }
}
