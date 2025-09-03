import { Component, EventEmitter, Input, Output } from '@angular/core';

type AccountType = 'Chequing' | 'Savings';

@Component({
  selector: 'app-bank-button',
  template: `
    <button
      [attr.type]="type"
      class="btn"
      [ngClass]="{
        'btn-primary': variant === 'primary' || accountType === 'Chequing',
        'btn-success': variant === 'success' || accountType === 'Savings'
      }"
      [disabled]="disabled"
      (click)="clicked.emit($event)">
      <ng-content></ng-content>
    </button>
  `
})
export class BankButtonComponent {
  /** Optional override; otherwise color derives from accountType */
  @Input() variant: 'primary' | 'success' | undefined;
  @Input() accountType: AccountType | undefined;
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' = 'button';

  @Output() clicked = new EventEmitter<Event>();
}
