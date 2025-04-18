import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CartService } from '../cart/cart.service';
import { StorageService } from '../services/storage.service';
import {CdkMenu, CdkMenuItem, CdkMenuTrigger} from '@angular/cdk/menu';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule, MatIconModule, MatMenuModule, CdkMenuTrigger, CdkMenu, CdkMenuItem],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavBarComponent {
  authService = inject(AuthService);
  cartService = inject(CartService);
  storageService = inject(StorageService);

  @Input() navBrand: string = 'Delivery App';

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

  getMatIconToggleMenu(): string { 
    if(this.isMenuOpen){
      return "close";
    }
    return "menu";
  }

  logout() {
    this.authService.logout();
  }
}
