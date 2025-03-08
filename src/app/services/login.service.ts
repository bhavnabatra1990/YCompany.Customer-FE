import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OktaAuthStateService } from '@okta/okta-angular';
import { map } from 'rxjs/operators';
import OktaAuth from '@okta/okta-auth-js';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private userClaimsSubject = new BehaviorSubject<any>(null);

  constructor(private oktaStateService: OktaAuthStateService, private oktaAuth: OktaAuth) {
    // Listen to authState$ changes and update the authentication status
    this.oktaStateService.authState$.pipe(

        map(async (authState) => {
            if (authState.isAuthenticated) {
              // Fetch and store user claims
              const userInfo = await this.oktaAuth.getUser();
              this.userClaimsSubject.next(userInfo);
            } else {
              this.userClaimsSubject.next(null);
            }
            return authState.isAuthenticated || false;
          })       
      ).subscribe(async (isAuthenticated) => {
        this.isAuthenticatedSubject.next(await isAuthenticated);
      });
  }

  // Observable to expose authentication status
  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

   // Observable for user claims
   get userClaims$(): Observable<any> {
    return this.userClaimsSubject.asObservable();
  }

  // Synchronous getter for quick access
  get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  get userClaims(): any {
    return this.userClaimsSubject.value;
  }
}
