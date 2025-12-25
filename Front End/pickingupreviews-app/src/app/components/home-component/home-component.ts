import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent {
  authService = inject(AuthService);
  currentUser = this.authService.currentUser;

  features = [
    {
      icon: '🔒',
      title: 'Secure Authentication',
      description: 'JWT-based authentication with role-based access control',
    },
    {
      icon: '🔑',
      title: 'Google Sign-In',
      description: 'Quick account creation and login with your Google account',
    },
    {
      icon: '✨',
      title: 'Modern UI',
      description: 'Beautiful and responsive design with Bootstrap 5',
    },
  ];
}
