import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // ✅

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // ✅ brings *ngIf, [ngClass], etc.
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  submitted = false; // ✅ track submit attempt
  form;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      accountName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      initialBalance: [0, [Validators.required, Validators.min(0)]],
      accountType: ['Chequing', [Validators.required]],
    });
  }

  get f() { return this.form.controls; }

  showError(name: keyof typeof this.f) {
    const c = this.f[name];
    return c.invalid && (c.touched || c.dirty || this.submitted);
  }

  submit() {
    this.submitted = true;               // ✅ ensure errors can show immediately
    if (this.form.invalid) return;       // don’t navigate if invalid
    // TODO: store account (spec wants FormBuilder + validators + UI) :contentReference[oaicite:0]{index=0}
    this.router.navigateByUrl('/dashboard');
  }
}
