import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyExchangeRatesService {
  private apiUrl = 'http://data.fixer.io/api/latest';
  private apiKey = 'cc1912432f906d4d10478cdc4c6e5db2';
  private symbols = 'USD,GBP,JPY,EUR';
  private currency = new BehaviorSubject<string>('EUR');

  constructor(private http: HttpClient) {}

  getCurrencyExchangeRates(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '?access_key=' + this.apiKey + '&symbols=' + this.symbols);
  }

  getCurrency(): Observable<string> {
    return this.currency.asObservable();
  }

  setCurrency(currency: string): void {
    this.currency.next(currency);
  }

}
