import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

type AccountType = 'Chequing' | 'Savings';
type ButtonType = 'Primary' | 'Success' | 'Danger' | 'Warning' | 'Info' | 'Light' | 'Dark';

@Component({
  selector: 'app-bank-button',
  templateUrl: './bank-button.html',
  styleUrls: ['./bank-button.css'],
  imports: [CommonModule],
})
export class BankButtonComponent {
  @Input() variant: AccountType | ButtonType | undefined;
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' = 'button';
  @Output() clicked = new EventEmitter<Event>();
}
