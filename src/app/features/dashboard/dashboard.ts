import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService, Account } from '../../core/account';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html'
})
export class DashboardComponent {
  accounts = signal<Account[]>([]);
  constructor(private svc: AccountService) {
    this.accounts.set(this.svc.all());
  }
}
