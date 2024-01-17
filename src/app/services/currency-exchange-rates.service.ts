import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyExchangeRatesService {
  private apiUrl = 'http://data.fixer.io/api/latest';
  private apiKey = 'cc1912432f906d4d10478cdc4c6e5db2';
  private symbols = 'USD,GBP,JPY,EUR';

  constructor(private http: HttpClient) {}

  getCurrencyExchangeRates(): Observable<any> {
    // FIXME: Uncoment this for function to work
    return this.http.get<any>(this.apiUrl + '?access_key=' + this.apiKey + '&symbols=' + this.symbols);
  }
}
