import { Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth-guard';
import { CartCheckoutComponent } from './cart-checkout/cart-checkout.component';
import { CartComponent } from './cart/cart.component';

export const CART_ROUTES: Routes = [
  { path: '', component: CartComponent },
  { path: 'checkout', component: CartCheckoutComponent, canActivate: [AuthGuard] }
];
