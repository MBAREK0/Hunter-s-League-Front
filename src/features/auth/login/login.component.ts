import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [
    RouterLink
  ]
})
export class LoginComponent {
  // username: string = '';
  // password: string = '';
  //
  // constructor(private authService: AuthService, private router: Router) {}
  //
  // onSubmit() {
  //   this.authService.login(this.username, this.password).subscribe({
  //     next: () => {
  //       this.router.navigate(['/dashboard']); // Redirect to dashboard after login
  //     },
  //     error: (err) => {
  //       console.error('Login failed', err);
  //       alert('Login failed. Please try again.');
  //     },
  //   });
  // }
}
