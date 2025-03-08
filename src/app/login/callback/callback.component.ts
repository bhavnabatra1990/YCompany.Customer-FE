import { Component, inject, OnInit } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
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
  constructor(
    private oktaAuth: OktaAuth,
    private loginService: LoginService,
    private router: Router
  ) {}

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
