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
}
