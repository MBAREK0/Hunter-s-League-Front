import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  standalone: true,
  template: ``,
  imports: []
})
export class LogoutComponent {
  constructor(private router: Router) {
    this.logout();
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
