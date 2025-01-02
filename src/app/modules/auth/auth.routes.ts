import { Routes } from '@angular/router';
import { AuthPageComponent } from './auth-page/auth-page.component';

export const AUTH_ROUTES: Routes = [
  { path: '', component: AuthPageComponent },
  { path: "signin", component: AuthPageComponent },
  { path: "signup", component: AuthPageComponent },
  { path: "reset-password", component: AuthPageComponent },
  { path: "verification/:email", component: AuthPageComponent },
];
