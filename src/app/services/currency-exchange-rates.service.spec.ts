import { TestBed } from '@angular/core/testing';

import { CurrencyExchangeRatesService } from './currency-exchange-rates.service';

describe('CurrencyExchangeRatesService', () => {
  let service: CurrencyExchangeRatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyExchangeRatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
