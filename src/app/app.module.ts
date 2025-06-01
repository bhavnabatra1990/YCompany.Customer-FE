import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OktaAuthModule, OKTA_CONFIG, OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
//import { MatTabsModule } from '@angular/material/tabs';
import { CallbackComponent } from './login/callback/callback.component';
import { LoginService } from './services/login.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoutComponent } from './logout/logout.component';
import { UserService } from './services/user.service';
import { PolicyService } from './services/policy.service';
import { DataService } from './services/data.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { PolicydetailComponent } from './policydetail/policydetail.component';

const oktaAuth = new OktaAuth({
  issuer: 'https://dev-17889767.okta.com/oauth2/default', // Replace with your Okta domain
  clientId: '0oanhjkxt3X2xoOPe5d7', // Replace with your Client ID
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
    PolicydetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OktaAuthModule,
    AsyncPipe,
    RouterOutlet,
    RouterLink,
    CommonModule,
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
