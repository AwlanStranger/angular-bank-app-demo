import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankButtonComponent } from './bank-button/bank-button';

@NgModule({
  declarations: [BankButtonComponent],
  imports: [CommonModule],
  exports: [BankButtonComponent] // ← make it usable elsewhere
})
export class SharedModule {}
