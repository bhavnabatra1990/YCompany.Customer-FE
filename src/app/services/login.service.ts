import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserProfile } from '../models/user-profile.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private userClaimsSubject = new BehaviorSubject<any>(null);
  private nameSubject = new BehaviorSubject<string>('');
  userName$ = this.nameSubject.asObservable();

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

  public setUserId(id: number | undefined, name: string | undefined): void {
    if(id) {
    localStorage.setItem('user_id', id.toString());
    }
    if(name) {
      this.nameSubject.next(name);
      }
  }

  //get token
  public geUserId(): number | null {
    var id = localStorage.getItem('user_id');
    if(id)
       return parseInt(id, 10);
    return null;
  }

   // Synchronous getter for quick access
   public get userName(): string {
    return this.nameSubject.value;
  }

}
