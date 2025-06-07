import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from './login/callback/callback.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { LogoutComponent } from './layouts/logout/logout.component';
import { PolicydetailComponent } from './layouts/policydetail/policydetail.component';
import { AddressComponent } from './layouts/address/address.component';
import { RegisterComponent } from './layouts/register/register.component';
import { OktaregisterComponent } from './layouts/oktaregister/oktaregister.component';
import { LoadingComponent } from './layouts/loading/loading.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'login/callback', component: CallbackComponent },
  { path: 'policy/:id', component: PolicydetailComponent },
  { path: 'address/:id/:policyId', component: AddressComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'loading', component: LoadingComponent },
  { path: 'oktaregister/:email/:policy', component: OktaregisterComponent },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
