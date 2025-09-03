import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive], // ✅ needed for routerLink / routerLinkActive
  templateUrl: './app.html',
})
export class AppComponent {}
