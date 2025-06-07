import { Component, inject } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';

@Component({
  selector: 'app-logout',
  standalone: false,
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
    private oktaAuth = inject(OKTA_AUTH);
    
  constructor() {
    this.logout();
  }

  public async logout(): Promise<void> {
    await this.oktaAuth.signOut();
    localStorage.clear();
    sessionStorage.clear();
  }

}
