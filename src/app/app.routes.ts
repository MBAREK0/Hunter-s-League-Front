import { Routes } from '@angular/router';
import { LoginComponent } from '../features/auth/login/login.component';
import { RegisterComponent } from '../features/auth/register/register.component';
import { DashboardComponent} from "../features/dashboard/dashboard.component";
import {HomeComponent} from "../features/home/home.component";
import {UnauthorizedComponent} from "../features/auth/unauthorized/unauthorized.component";
import {authGuard} from "../core/guards/auth.guard";
import {LogoutComponent} from "../features/auth/logout/logout.component";

export const routes: Routes = [
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'auth/register',
    component: RegisterComponent
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      // home route
      {
        path: '',
        component: HomeComponent,
        canActivate: [authGuard],
        data: { role: 'MEMBER', permissions: ['CAN_VIEW_RANKINGS','CAN_VIEW_COMPETITIONS','CAN_PARTICIPATE'] },
      }

      ]
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },
  { path: 'logout', component: LogoutComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', redirectTo: '/' },
];
