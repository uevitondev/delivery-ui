import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';


@Component({
  selector: 'app-seller-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './seller-dashboard.component.html',
  styleUrl: './seller-dashboard.component.scss'
})
export class SellerDashboardComponent implements OnInit {
  authService = inject(AuthService);

  ngOnInit(): void {
    return;
  }




}
