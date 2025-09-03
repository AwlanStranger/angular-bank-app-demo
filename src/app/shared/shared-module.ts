import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankButtonComponent } from './bank-button/bank-button';

@NgModule({
  imports: [CommonModule, BankButtonComponent],
  exports: [BankButtonComponent]
})
export class SharedModule {}
