import { afterNextRender, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service';

declare const google: any;

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loading = signal(false);
  errorMessage = signal<string | null>(null);
  showResendLink = signal(false);
  resendingEmail = signal(false);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor() {
    afterNextRender(() => {
      this.initializeGoogleSignIn();
    });
  }

  ngOnInit(): void {}

  initializeGoogleSignIn(): void {
    setTimeout(() => {
      if (typeof google !== 'undefined') {
        google.accounts.id.initialize({
          client_id: '1017515306667-dq1kkvunpaqae8u5va22rpn512dih5tr.apps.googleusercontent.com',
          callback: (response: any) => this.handleGoogleSignIn(response),
        });

        google.accounts.id.renderButton(document.getElementById('google-signin-button'), {
          theme: 'filled_blue',
          size: 'large',
          width: 400,
          text: 'signin_with',
        });
      }
    }, 100);
  }

  handleGoogleSignIn(response: any): void {
    this.authService.loginWithGoogle(response.credential).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.errorMessage.set(error.error?.message || 'Google sign-in failed. Please try again.');
      },
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading.set(true);
      this.errorMessage.set(null);
      this.showResendLink.set(false);

      this.authService.login(this.loginForm.value as any).subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.loading.set(false);
          const message = error.error?.message || 'Invalid email or password';
          this.errorMessage.set(message);

          if (message.includes('verify your email')) {
            this.showResendLink.set(true);
          }
        },
      });
    }
  }

  resendVerification(): void {
    this.resendingEmail.set(true);
    const email = this.loginForm.get('email')?.value || '';

    this.authService.resendVerification(email).subscribe({
      next: (response) => {
        this.resendingEmail.set(false);
        this.errorMessage.set(null);
        alert(response.message);
      },
      error: (error) => {
        this.resendingEmail.set(false);
        this.errorMessage.set(error.error?.message || 'Failed to resend verification email');
      },
    });
  }
}
