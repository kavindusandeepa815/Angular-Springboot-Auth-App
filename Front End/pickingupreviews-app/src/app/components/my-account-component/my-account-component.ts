import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../services/user-service';
import { User } from '../../models/user.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-account-component',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './my-account-component.html',
  styleUrl: './my-account-component.css'
})
export class MyAccountComponent {
  private userService = inject(UserService);

  user = signal<User | null>(null);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userService.getUserProfile().subscribe({
      next: (userData) => {
        this.user.set(userData);
      },
      error: (error) => {
        this.error.set('Failed to load user profile');
        console.error('Error loading profile:', error);
      }
    });
  }
}
