import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AccountService, Account } from '../../core/account';
import { SharedModule } from '../../shared/shared-module';

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
  templateUrl: './transfer.html'
})
export class TransferComponent {
  submitted = false;
  accounts = signal<Account[]>([]);
  form;

  constructor(private fb: FormBuilder, private accts: AccountService) {
    this.accounts.set(this.accts.all());
    this.form = this.fb.group({
      fromId: ['', Validators.required],
      toId:   ['', Validators.required],
      amount: [0,   [Validators.required, Validators.min(0.01)],
      ],
    });
  }

  get f() { return this.form.controls; }

  // helper for showing Bootstrap errors
  showError(name: keyof typeof this.f) {
    const c = this.f[name];
    return c.invalid && (c.touched || c.dirty || this.submitted);
  }

  submit() {
    this.submitted = true;
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const { fromId, toId, amount } = this.form.value!;
    try {
      this.accts.transfer(fromId!, toId!, Number(amount));
      // Optional: toast or alert success; we’ll add navigation later
      this.form.reset({ fromId: '', toId: '', amount: 0 });
      this.submitted = false;
    } catch (e: any) {
      alert(e.message ?? 'Transfer failed');
    }
  }
}
