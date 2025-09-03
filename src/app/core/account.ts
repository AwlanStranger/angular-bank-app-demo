import { Injectable } from '@angular/core';

export type AccountType = 'Chequing' | 'Savings';
export interface Account {
  id: string;
  name: string;
  type: AccountType;
  balance: number;
  history: { at: string; kind: 'create' | 'transfer-in' | 'transfer-out'; amount: number }[];
}

@Injectable({ providedIn: 'root' })
export class AccountService {
  private accounts: Account[] = [];

  create(name: string, type: AccountType, initialBalance: number) {
    const acct: Account = {
      id: crypto.randomUUID(),
      name,
      type,
      balance: initialBalance,
      history: [{ at: new Date().toISOString(), kind: 'create', amount: initialBalance }],
    };
    this.accounts.push(acct);
    return acct;
  }

  all() {
    // return a shallow copy to avoid external mutation
    return [...this.accounts];
  }

  byId(id: string) {
    return this.accounts.find(a => a.id === id) ?? null;
  }
}
