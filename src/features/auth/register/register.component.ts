import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { nationalities} from '../../../core/data/nationalities';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    CommonModule,
    NgOptimizedImage
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  serverErrorMessage: string | null = null;
  nationalities: string[] = nationalities;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('.*[a-z].*'),
          Validators.pattern('.*[A-Z].*'),
          Validators.pattern('.*[0-9].*'),
        ],
      ],
      confirmPassword: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      cin: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      nationality: ['', Validators.required],
    });
  }

  get passwordMismatch(): boolean {
    const { password, confirmPassword } = this.registerForm.value;
    return password && confirmPassword && password !== confirmPassword;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      if (this.passwordMismatch) {
        this.serverErrorMessage = 'Passwords do not match';
        return;
      }

      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          // save the token in local storage
          localStorage.setItem('authToken', response.token);
          // redirect to the dashboard
          this.router.navigate(['/']).then(r => console.log(r));

          this.serverErrorMessage = null;
        },
        error: (err) => {
          this.serverErrorMessage = err.error?.message || 'Registration failed';
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
