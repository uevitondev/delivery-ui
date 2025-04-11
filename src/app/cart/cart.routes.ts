import { Routes } from '@angular/router';
import { CartCheckoutComponent } from './cart-checkout/cart-checkout.component';
import { CartComponent } from './cart/cart.component';
import { AuthGuard } from '../guards/auth-guard';

export const CART_ROUTES: Routes = [
  { path: '', component: CartComponent },
  {
    path: 'checkout',
    component: CartCheckoutComponent,
    canActivate: [AuthGuard],
  },
];
