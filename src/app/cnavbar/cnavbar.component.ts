import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CartService } from '../cart/cart.service';
import { StorageService } from '../services/storage.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cnavbar',
  imports: [RouterLink, MatIconModule],
  templateUrl: './cnavbar.component.html',
  styleUrl: './cnavbar.component.scss'
})
export class CnavbarComponent {
  readonly authService = inject(AuthService);
  readonly cartService = inject(CartService);
  readonly  storageService = inject(StorageService);

  @Input() title: string = '';

  themeIcon: string = 'dark_mode';
  userImage!: string;
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleTheme() {
    const theme = document.documentElement.classList.toggle('dark-theme');
    if (theme) {
      return (this.themeIcon = 'light_mode');
    }
    return (this.themeIcon = 'dark_mode');
  }

  logout() {
    this.authService.logout();
  }

}
