import { PortalModule, TemplatePortal } from '@angular/cdk/portal';
import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth.service';
import { ModalService, TemplateModalOverlayRef } from '../../../core/services/modal.service';
import { AddressListComponent } from '../../address/address-list/address-list.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { OrderListComponent } from "../../order/order-list/order-list.component";

@Component({
  selector: 'app-user-account',
  standalone: true,
  imports: [
    PortalModule,
    MatIconModule,
    UserProfileComponent,
    AddressListComponent,
    ModalComponent,
    OrderListComponent
],
  templateUrl: './user-account.component.html',
  styleUrl: './user-account.component.scss'
})
export class UserAccountComponent implements OnInit {

  authService = inject(AuthService);
  modalService = inject(ModalService);

  templateRef!: TemplateModalOverlayRef;

  ngOnInit(): void {
  }


  public openModalProfile(template: TemplatePortal<any>) {
    this.templateRef = this.modalService.open(template, {}, {
      hasBackdropClick: true
    });
  }

  public openModalOrders(template: TemplatePortal<any>) {
    this.templateRef = this.modalService.open(template, {}, {
      hasBackdropClick: true
    });
  }

  public openModalAddresses(template: TemplatePortal<any>) {
    this.templateRef = this.modalService.open(template, {}, {
      hasBackdropClick: true
    });
  }



  public closeTemplateModal() {
    this.templateRef.close();
  }



  logout() {
    this.authService.logout();
  }



}
