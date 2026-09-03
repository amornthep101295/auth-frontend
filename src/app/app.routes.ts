import { Routes } from '@angular/router';
import { LoginComponent } from './login/login'; 
import { RegisterComponent } from './register/register';
import { WelcomeComponent } from './welcome/welcome';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent }, 
  { path: 'register', component: RegisterComponent }, 
  { path: 'welcome', 
    component: WelcomeComponent,
    canActivate: [authGuard] }, 
  { path: '**', redirectTo: '' } 
];