import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { Policy } from '../models/policies.model';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  private apiUrl = 'https://localhost:7059/api/policy'; 
  private policyUrl = '/all';

  constructor(private http: HttpClient) {}

  getAllPolicies(userId: number): Observable<ApiResponse<Policy[]>> {
    return this.http.get<ApiResponse<Policy[]>>(`${this.apiUrl}${this.policyUrl}?userId=${userId}`);
  }

  getPolicyDetail(policyId: number, userId: number): Observable<ApiResponse<Policy>> {
    return this.http.get<ApiResponse<Policy>>(`${this.apiUrl}/?userId=${userId}&policyId=${policyId}`);
  }
}
