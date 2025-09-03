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

  transfer(fromId: string, toId: string, amount: number) {
    if (fromId === toId) throw new Error('Choose two different accounts');
    if (amount <= 0) throw new Error('Amount must be > 0');
  
    const from = this.accounts.find(a => a.id === fromId);
    const to   = this.accounts.find(a => a.id === toId);
    if (!from || !to) throw new Error('Account not found');
    if (from.balance < amount) throw new Error('Insufficient funds');
  
    from.balance -= amount;
    to.balance   += amount;
  
    const ts = new Date().toISOString();
    from.history.push({ at: ts, kind: 'transfer-out', amount });
    to.history.push({ at: ts, kind: 'transfer-in',  amount });
  
    return { from, to };
  }
  
}
