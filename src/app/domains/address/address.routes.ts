import { Routes } from '@angular/router';
import { AddressListComponent } from './address-list/address-list.component';
import { AddressNewComponent } from './address-new/address-new.component';
import { AddressEditComponent } from './address-edit/address-edit.component';

export const ADDRESS_ROUTES: Routes = [
  { path: '', component: AddressListComponent },
  { path: 'new', component: AddressNewComponent },
  { path: 'edit/:id', component: AddressEditComponent },
];
