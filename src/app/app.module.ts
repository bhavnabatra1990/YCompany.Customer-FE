import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OktaAuthModule, OKTA_CONFIG, OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CallbackComponent } from './login/callback/callback.component';
import { LoginService } from './services/login.service';
import { NavBarComponent } from './layouts/nav-bar/nav-bar.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { LogoutComponent } from './layouts/logout/logout.component';
import { UserService } from './services/user.service';
import { PolicyService } from './services/policy.service';
import { DataService } from './services/data.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { AddressComponent } from './layouts/address/address.component';
import { FormsModule } from '@angular/forms';
import { PolicydetailComponent } from './layouts/policydetail/policydetail.component';
import { RegisterComponent } from './layouts/register/register.component';
import { OktaregisterComponent } from './layouts/oktaregister/oktaregister.component';
import { environment } from './environment';
import { LoadingComponent } from './layouts/loading/loading.component';

const oktaAuth = new OktaAuth({
  issuer: environment.issuer,
  clientId: environment.clientId,
  redirectUri: window.location.origin + '/login/callback',
  scopes: ['openid', 'offline_access', 'profile'],
  postLogoutRedirectUri: window.location.origin
});

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CallbackComponent,
    NavBarComponent,
    DashboardComponent,
    LogoutComponent,
    AddressComponent,
    PolicydetailComponent,
    RegisterComponent,
    OktaregisterComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    OktaAuthModule,
    AsyncPipe,
    RouterOutlet,
    RouterLink,
    HttpClientModule  
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: { oktaAuth } }, 
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor,multi: true },
    OktaAuthStateService, LoginService, UserService, PolicyService, DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
