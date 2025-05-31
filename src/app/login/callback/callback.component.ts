import { Component, inject, OnInit } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import OktaAuth, { AuthState } from '@okta/okta-auth-js';
import { filter, map } from 'rxjs';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  standalone: false,
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.css'
})
export class CallbackComponent implements OnInit {
    private oktaStateService = inject(OktaAuthStateService);
    private oktaAuth = inject(OKTA_AUTH);

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
     // Listen to authState$ changes and update the authentication status
     this.oktaStateService.authState$.pipe(

      map(async (authState) => {
          if (authState.isAuthenticated) {
            // Fetch and store user claims
            const userInfo = await this.oktaAuth.getUser();
            this.loginService.setuserClaims(userInfo);
            var token = await this.oktaAuth.getAccessToken();
            this.loginService.setAccessToken(token);
          } else {
            this.loginService.setuserClaims(null);
          }
          return authState.isAuthenticated || false;
        })       
    ).subscribe(async (isAuthenticated) => {
      this.loginService.setAuthenticated(await isAuthenticated);
    });
  }

  async ngOnInit() {
    try {
      // Handle the login redirect and retrieve tokens
      await this.oktaAuth.handleLoginRedirect();

      // Redirect to the appropriate route after login
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Error during login callback:', error);
    }
  }
}
