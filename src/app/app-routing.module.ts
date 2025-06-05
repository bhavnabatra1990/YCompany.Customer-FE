import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from './login/callback/callback.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoutComponent } from './logout/logout.component';
import { PolicydetailComponent } from './policydetail/policydetail.component';
import { AddressComponent } from './address/address.component';
import { RegisterComponent } from './register/register.component';
import { OktaregisterComponent } from './oktaregister/oktaregister.component';
import { LoadingComponent } from './loading/loading.component';

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
