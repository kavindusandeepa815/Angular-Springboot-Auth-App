import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { HomeComponent } from './components/home-component/home-component';
import { LoginComponent } from './components/login-component/login-component';
import { RegisterComponent } from './components/register-component/register-component';
import { VerifyEmailComponent } from './components/verify-email-component/verify-email-component';
import { ForgotPasswordComponent } from './components/forgot-password-component/forgot-password-component';
import { ResetPasswordComponent } from './components/reset-password-component/reset-password-component';
import { MyAccountComponent } from './components/my-account-component/my-account-component';
import { DashboardComponent } from './components/dashboard-component/dashboard-component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'verify-email',
    component: VerifyEmailComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: 'my-account',
    component: MyAccountComponent,
    canActivate: [authGuard],
  },
  {
    path: "dashboard",
    component: DashboardComponent,
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];
