import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-verify-email-component',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './verify-email-component.html',
  styleUrl: './verify-email-component.css'
})
export class VerifyEmailComponent {
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  loading = signal(true);
  success = signal(false);
  error = signal(false);
  message = signal('');

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    
    if (token) {
      this.authService.verifyEmail(token).subscribe({
        next: (response) => {
          this.loading.set(false);
          this.success.set(true);
          this.message.set(response.message);
        },
        error: (error) => {
          this.loading.set(false);
          this.error.set(true);
          this.message.set(error.error?.message || 'Verification failed');
        }
      });
    } else {
      this.loading.set(false);
      this.error.set(true);
      this.message.set('Invalid verification link');
    }
  }
}
