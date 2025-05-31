import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private userClaimsSubject = new BehaviorSubject<any>(null);


    // Observable to expose authentication status
    public setAuthenticated(isAuthenticated: boolean) {
      this.isAuthenticatedSubject.next(isAuthenticated);
    }

    // Observable to expose authentication status
    public setuserClaims(userInfo : any) {
      this.userClaimsSubject.next(userInfo);
    }

  // Synchronous getter for quick access
  public get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  public get userClaims(): any {
    return this.userClaimsSubject.value;
  }
}
