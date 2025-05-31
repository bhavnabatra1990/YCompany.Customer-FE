import { Component, inject } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import OktaAuth, { AuthState } from '@okta/okta-auth-js';
import { async, filter, map } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private oktaAuth = inject(OKTA_AUTH);

  // Function to initiate login
  async login() {
    await this.oktaAuth.signInWithRedirect({});
  }

  //public isAuthenticated$;

  // constructor(private oktaStateService: OktaAuthStateService, private oktaAuth: OktaAuth) {
  //   //  // Initialize the observable in the constructor
  //   //  this.isAuthenticated$ = this.oktaStateService.authState$.pipe(
  //   //   map((authState) => authState.isAuthenticated || false)
  //   // );
  //   // Function to initiate login
  // async login() {
  //   await this.oktaAuth.signInWithRedirect({
  //     originalUri: '/dashboard', // Redirect to dashboard after login
  //   });
  // }
  // }  

  // public async signIn() : Promise<void> {
  //   await this.oktaAuth.signInWithRedirect();
  // }

  // public async signOut(): Promise<void> {
  //   await this.oktaAuth.signOut();
  // }
}
