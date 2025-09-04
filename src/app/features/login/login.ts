import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // ✅
import { AccountService, AccountType } from '../../core/account'; // adjust path if needed
import { SharedModule } from '../../shared/shared-module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SharedModule], // ✅ brings *ngIf, [ngClass], etc.
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  submitted = false; // ✅ track submit attempt
  form;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private accounts: AccountService
  ) {
    this.form = this.fb.group({
      accountName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      initialBalance: [0, [Validators.required, Validators.min(0)]],
      accountType: ['Chequing' as AccountType, [Validators.required]],
    });
  }

  get f() { return this.form.controls; }

  showError(name: keyof typeof this.f) {
    const c = this.f[name];
    return c.invalid && (c.touched || c.dirty || this.submitted);
  }

  submit() {
    this.submitted = true;               // ✅ ensure errors can show immediately
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { accountName, accountType, initialBalance } = this.form.value!;
    this.accounts.create(accountName!, accountType!, Number(initialBalance));
    this.router.navigateByUrl('/dashboard');
  }
}
