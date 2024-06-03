import { Routes } from '@angular/router';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { TestapiComponent } from './pages/testapi/testapi.component';
import { StoreComponent } from './pages/store/store.component';
import { ListStoreComponent } from './components/list-store/list-store.component';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "store",
    component: StoreComponent
  },
  {
    path: "stores",
    component: ListStoreComponent
  },
  {
    path: "signin",
    component: SigninComponent
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "forbidden",
    component: AccessDeniedComponent
  },
  {
    path: "testapi",
    component: TestapiComponent
  }
];
