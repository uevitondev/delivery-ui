import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';
import { StorageService } from '../../../core/services/storage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule, MatMenuModule, MatIconModule, RouterLink, NgIf, AsyncPipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

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
