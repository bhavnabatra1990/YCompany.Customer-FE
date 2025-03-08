import { Component } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';

@Component({
  selector: 'app-logout',
  standalone: false,
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(private oktaAuth: OktaAuth) {
    this.logout();
  }

  public async logout(): Promise<void> {
    await this.oktaAuth.signOut();
  }

}
