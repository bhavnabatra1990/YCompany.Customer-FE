import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
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

  public getuserClaims(): any {
    return this.userClaimsSubject.value;
  }

  public setAccessToken(token: string | undefined): void {
    if(token) {
    localStorage.setItem('access_token', token);
    }
  }

  //get token
  public getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }
}
