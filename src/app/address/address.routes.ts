import { Routes } from '@angular/router';
import { AddressCreateComponent } from './address-create/address-create.component';
import { AddressUpdateComponent } from './address-edit/address-update.component';
import { AddressListComponent } from './address-list/address-list.component';

export const ADDRESS_ROUTES: Routes = [
  { path: '', component: AddressListComponent },
  { path: 'new', component: AddressCreateComponent },
  { path: 'update/:id', component: AddressUpdateComponent },
];
