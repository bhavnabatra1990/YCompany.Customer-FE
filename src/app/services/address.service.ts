import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../models/api-response.model';
import { Observable } from 'rxjs';
import { Address } from '../models/address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private apiUrl = 'https://localhost:7059/api/address'; 

  constructor(private http: HttpClient) {}

  getAddressDetail(addressId: number): Observable<ApiResponse<Address>> {
    return this.http.get<ApiResponse<Address>>(`${this.apiUrl}/${addressId}`);
  }

  updateAddress(address: Address): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(`${this.apiUrl}`, address);
  }
}
