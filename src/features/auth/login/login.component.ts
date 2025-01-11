import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { JwtService} from "../../../core/services/jwt.service";
import {CommonModule, NgOptimizedImage} from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    CommonModule,
    NgOptimizedImage
  ]
})
export class LoginComponent {
  loginForm: FormGroup;
  serverErrorMessage: string | null = null;


  constructor(private fb: FormBuilder, private authService: AuthService, private jwtService: JwtService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['',Validators.required]
    });
  }



  onSubmit(): void {
    if (this.loginForm.valid) {

      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          // save the token in local storage
          localStorage.setItem('authToken', response.token);
          // save the refreshToken in local storage
          localStorage.setItem('refreshToken', response.refreshToken);

          // redirect to the layout
          this.router.navigate(['/']).then(r => console.log(r));

          this.serverErrorMessage = null;
        },
        error: (err) => {
          this.serverErrorMessage = err.error?.message || 'An error occurred';
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
