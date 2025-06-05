import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserProfile } from '../models/user-profile.model';
import { ApiResponse } from '../models/api-response.model';
import { SignUpData } from '../models/signUpData.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://localhost:7059/api/user';
  private userProfileUrl = '/profile';
  private getSignUpUrl = '/getSignUp';

  constructor(private http: HttpClient) { }


  fetchUserProfile(email: string): Observable<ApiResponse<UserProfile>> {
    return this.http.get<ApiResponse<UserProfile>>(`${this.apiUrl}${this.userProfileUrl}?email=${email}`);
  }

  getSignUp(policy: string, email: string): Observable<ApiResponse<number>> {
    return this.http.get<ApiResponse<number>>(`${this.apiUrl}${this.getSignUpUrl}?policyNumber=${policy}&email=${email}`);
  }

  signUpCustomer(signUpData: SignUpData): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(`${this.apiUrl}/signup`, signUpData, { headers });
  }

}
