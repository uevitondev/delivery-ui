import { Routes } from '@angular/router';
import { BadrequestComponent } from './badrequest/badrequest.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { NotfoundComponent } from './notfound/notfound.component';

export const ERROR_ROUTES: Routes = [
  { path: 'badrequest', component: BadrequestComponent },
  { path: 'forbbiden', component: ForbiddenComponent },
  { path: 'notfound', component: NotfoundComponent }
];

