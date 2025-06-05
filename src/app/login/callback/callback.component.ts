import { Component, inject, OnInit } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { filter, switchMap, tap } from 'rxjs/operators';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-callback',
  standalone: false,
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css'] // ✅ Corrected key
})
export class CallbackComponent implements OnInit {
  private oktaStateService = inject(OktaAuthStateService);
  private oktaAuth: OktaAuth = inject(OKTA_AUTH);

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private router: Router
  ) {
    // Listen to Okta auth state changes
    this.oktaStateService.authState$
      .pipe(
        filter(authState => !!authState?.isAuthenticated),
        switchMap(() => this.oktaAuth.getUser()),
        tap(async userInfo => {
          this.loginService.setuserClaims(userInfo);
          const token = await this.oktaAuth.getAccessToken();
          this.loginService.setAccessToken(token);
          this.loginService.setAuthenticated(true);
          const claims = this.loginService.getuserClaims();
          //get email from claims
          if (!claims || !claims.RoleType) {
            alert('No email found in user claims');
            this.router.navigate(['/logout']);
          }
          if(claims.RoleType === 'Customer') {
            this.router.navigate(['/dashboard']);
          } else if (claims.RoleType === 'Agent') {
            alert('This application is not available for now for Agents. Please contact adminstrator.');
          }
        })
      )
      .subscribe();
  }

  async ngOnInit() {
    try {
      await this.oktaAuth.handleLoginRedirect();
      this.router.navigate(['/loading']);
    } catch (error) {
      console.error('Error during login callback:', error);
    }
  }
}
