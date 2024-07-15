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
import { RouterService } from '../../../core/services/router.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule, MatMenuModule, MatIconModule, RouterLink, NgIf, AsyncPipe
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavBarComponent implements OnInit {

  ENV = environment;
  authService = inject(AuthService);
  cartService = inject(CartService);
  storageService = inject(StorageService);
  routerService = inject(RouterService);
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


  logout() {
    this.authService.logout();
    this.routerService.toHome();
  }

}
