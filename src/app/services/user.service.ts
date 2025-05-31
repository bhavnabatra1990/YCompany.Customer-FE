import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfile } from '../models/user-profile.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //{{baseUrl}}/api/User/profile?email=batrabhavna27@gmail.com
  private apiUrl = 'https://localhost:7059/api/user';  // Replace with your actual API URL
  private userProfileUrl = '/profile';

  constructor(private http: HttpClient) {}

  getProfile(email: string): Observable<ApiResponse<UserProfile>> {
    return this.http.get<ApiResponse<UserProfile>>(`${this.apiUrl}${this.userProfileUrl}?email=${email}`);
  }

  // // Sign up new user
  // signUp(signUpData: SignUpData): Observable<any> {
  //   const headers = new HttpHeaders({'Content-Type': 'application/json'});
  //   return this.http.post(`${this.apiUrl}/signup`, signUpData, { headers });
  // }
  
}
