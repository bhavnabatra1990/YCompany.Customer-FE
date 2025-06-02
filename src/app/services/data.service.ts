import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { DataModel } from '../models/data.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'https://localhost:7059/api/data'; 

  constructor(private http: HttpClient) {}

  //get countries
  getCountries(): Observable<any[]> {
    return this.http.get<{ response: { data: any[] } }>(`${this.apiUrl}/countries`).pipe(
      map(response => response.response.data) // Extract the data array
    );
  }

  getStateFromCountry(countryId: number): Observable<any[]> {
    return this.http.get<{ response: { data: any[] } }>(`${this.apiUrl}/states/${countryId}`).pipe(
      map(response => response.response.data) // Extract the data array
    );
  }

  getCityFromState(stateId: number): Observable<any[]> {
    return this.http.get<{ response: { data: any[] } }>(`${this.apiUrl}/cities/${stateId}`).pipe(
      map(response => response.response.data) // Extract the data array
    );
  }

}
