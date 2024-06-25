import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { StorageService } from '../../services/storage.service';
import { AuthResponse } from '../../model/auth/auth-response';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    MatToolbarModule, MatMenuModule, MatIconModule, RouterLink, NgIf, AsyncPipe
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {

  ENV = environment;
  authService = inject(AuthService);
  cartService = inject(CartService);
  storageService = inject(StorageService);
  router = inject(Router);
  icon: string = 'dark_mode';
  userImage!: string;

  ngOnInit(): void {

  }

  isAuthLoggedIn() {
    return this.authService.isLogged();
  }

  getAuthName() {
    return this.authService.getAuthName();
  }

  getItemCount() {
    return this.cartService.getItemCount();
  }

  toggleTheme() {
    const theme = document.body.classList.toggle('dark-theme');
    if (theme) {
      return this.icon = 'light_mode';
    }
    return this.icon = 'dark_mode';
  }

  navigateToHome() {
    this.router.navigate(["home"]);
  }

  navigateToStore() {
    this.router.navigate(["store"]);
  }

  navigateToSignIn() {
    this.router.navigate(["signin"]);
  }
  navigateToSignUp() {
    this.router.navigate(["signup"]);
  }
  navigateToOrders() {
    this.router.navigate(["orders"]);
  }
  navigateToAccount() {
    this.router.navigate(["account"]);
  }
  navigateToCart() {
    this.router.navigate(["cart"]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["home"]);
  }

}
