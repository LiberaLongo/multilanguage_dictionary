// Angular/src/app/app.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <h1>Hello World</h1>
    <button (click)="navigateToChinese()">Learn Chinese</button>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.css']
})
export class AppComponent {
  constructor(private router: Router) {}

  navigateToChinese() {
    this.router.navigate(['/chinese']);
  }
}
