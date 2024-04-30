import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    MatToolbarModule, MatMenuModule, MatIconModule, RouterLink, NgIf, AsyncPipe
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  authService = inject(AuthService);
  cartService = inject(CartService);
  storage = inject(StorageService);
  router = inject(Router);

  isLoggedIn = true;
  icon: string = 'dark_mode';
  userImage!: string;
  userName!: string;


  getNameAuthUser() {
    //return this.authService.getNameAuthUser();
  }

  cartCount() {
    return this.cartService.getCartCount();
  }

  toggleTheme() {
    const theme = document.body.classList.toggle('dark-theme');
    if (theme) {
      return this.icon = 'light_mode';
    }
    return this.icon = 'dark_mode';
  }

  navigateToHome() { }
  navigateToSignIn() {
    this.isLoggedIn = true;
  }
  navigateToSignUp() { }
  navigateToOrders() { }
  navigateToAccount() { }
  navigateToCart() { }
  logout() {
    this.isLoggedIn = false;
  }

}
