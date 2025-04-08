import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasicCalculatorService {
  private apiUrl = 'https://localhost:5166/calculator'; // replace with azure

  constructor(private http: HttpClient) { }

  calculate(expression: string): Observable<any> {
    return this.http.post(this.apiUrl, { expression });
  }

  getHistory(): Observable<any> {
    return this.http.get(`${this.apiUrl}/history`);
  }
}
