import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-seller-dashboard',
  standalone: true,
  imports: [MatIconModule, RouterModule, NavBarComponent],
  templateUrl: './seller-dashboard.component.html',
  styleUrl: './seller-dashboard.component.scss',
})
export class SellerDashboardComponent {}
