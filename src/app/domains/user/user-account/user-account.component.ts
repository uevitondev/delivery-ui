import { PortalModule } from '@angular/cdk/portal';
import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ModalOverlayRef, ModalService } from '../../../core/services/modal.service';
import { ModalComponent } from '../../../modules/shared/modal/modal.component';
import { AddressListComponent } from '../../address/address-list/address-list.component';
import { AuthService } from '../../auth/auth.service';
import { OrderListComponent } from '../../order/order-list/order-list.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-user-account',
  imports: [PortalModule, MatIconModule, UserProfileComponent, AddressListComponent, ModalComponent, OrderListComponent],
  templateUrl: './user-account.component.html',
  styleUrl: './user-account.component.scss',
})
export class UserAccountComponent implements OnInit {
  authService = inject(AuthService);
  modalService = inject(ModalService);

  modalOverlayRef!: ModalOverlayRef;

  ngOnInit(): void { }

  logout() {
    this.authService.logout();
  }
}
