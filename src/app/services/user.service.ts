import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserProfile } from '../models/user-profile.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://localhost:7059/api/user';
  private userProfileUrl = '/profile';

  constructor(private http: HttpClient) { }


  fetchUserProfile(email: string): Observable<ApiResponse<UserProfile>> {
    return this.http.get<ApiResponse<UserProfile>>(`${this.apiUrl}${this.userProfileUrl}?email=${email}`);
  }

  // // Sign up new user
  // signUp(signUpData: SignUpData): Observable<any> {
  //   const headers = new HttpHeaders({'Content-Type': 'application/json'});
  //   return this.http.post(`${this.apiUrl}/signup`, signUpData, { headers });
  // }

}
