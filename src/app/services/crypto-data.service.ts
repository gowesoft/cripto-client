import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CryptoDataService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getCryptoData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/crypto`);
  }
}
