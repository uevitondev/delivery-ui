import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { AuthService } from '../auth/auth.service';
import { CartService } from '../cart/cart.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule, MatIconModule, MatMenuModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavBarComponent {
  ENV = environment;
  authService = inject(AuthService);
  cartService = inject(CartService);
  storageService = inject(StorageService);

  icon: string = 'dark_mode';
  userImage!: string;
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleTheme() {
    const theme = document.body.classList.toggle('dark-theme');
    if (theme) {
      return (this.icon = 'light_mode');
    }
    return (this.icon = 'dark_mode');
  }

  logout() {
    this.authService.logout();
  }
}
