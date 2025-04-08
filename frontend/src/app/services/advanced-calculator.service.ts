import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdvancedCalculatorService {
  private apiUrl = 'https://localhost:5155/advancedCalculator'; // replace with azurre after deployment

  constructor(private http: HttpClient) { }

  calculate(expression: string): Observable<any> {
    return this.http.post(this.apiUrl, { expression });
  }

  getHistory(): Observable<any> {
    return this.http.get(`${this.apiUrl}/history`);
  }
}
