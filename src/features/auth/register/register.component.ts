import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  nationalities: string[] = [
    'Afghan', 'Albanian', 'Algerian', 'American', 'Andorran', 'Angolan',
    'Antiguans', 'Argentinean', 'Armenian', 'Australian', 'Austrian',
    'Azerbaijani', 'Bahamian', 'Bahraini', 'Bangladeshi', 'Barbadian',
    // Add the rest of the nationalities...
  ];

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('.*[a-z].*'), // At least one lowercase letter
          Validators.pattern('.*[A-Z].*'), // At least one uppercase letter
          Validators.pattern('.*[0-9].*'), // At least one digit
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('.*[a-z].*'), // At least one lowercase letter
          Validators.pattern('.*[A-Z].*'), // At least one uppercase letter
          Validators.pattern('.*[0-9].*'), // At least one digit
        ],
      ],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      cin: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      nationality: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
        console.log('Passwords do not match');
        return;
      }

      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => console.log('Registration successful', response),
        error: (err) => console.error('Registration failed', err),
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
