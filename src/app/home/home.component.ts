import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faEarthAmericas,
  faHome,
  faMapPin,
  faMoneyBill,
  faPlaneDeparture,
  faShoppingCart,
  faPlus,
  faMinus,
  faF,
  faI,
  faT
} from '@fortawesome/free-solid-svg-icons';
import { BasketService } from '../services/basket.service';
import { TripsService } from '../services/trips.service';
import { Trip } from '../trip';
import { HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { CurrencyExchangeRatesService } from '../services/currency-exchange-rates.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FontAwesomeModule, HttpClientModule, NgFor, CurrencyPipe, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  faEarthAmericas = faEarthAmericas;
  faHome = faHome;
  faMapPin = faMapPin;
  faMoneyBill = faMoneyBill;
  faPlaneDeparture = faPlaneDeparture;
  faShoppingCart = faShoppingCart;
  faPlus = faPlus;
  faMinus = faMinus;
  faF = faF;
  faI = faI;
  faT = faT;

  trips: Trip[] = [];

  selectedCurrency = 'EUR';

  constructor(
    private tripsService: TripsService,
    private basketService: BasketService,
    private currencyExchangeRatesService: CurrencyExchangeRatesService
  ) {}

  ngOnInit(): void {
    this.getTrips();
  }

  getTrips(): void {
    this.tripsService.getTrips().subscribe((trips) => {
      this.trips = trips.slice(2, 5);
    });

    console.log('Trips:' + this.trips);
  }

  addToBasket(trip: Trip): void {
    console.log('Adding trip to basket: ' + trip);
    this.basketService.addToBasket(trip);
  }

  removeFromBasket(trip: Trip): void {
    console.log('Removing trip from basket: ' + trip);
    this.basketService.removeFromBasket(trip);
  }

  changeCurrency(currency: string): void {
    this.selectedCurrency = currency;
  }

  getCurrency(): string {
    return this.selectedCurrency;
  }

  checkTripAvailability(trip: Trip): number {
    return this.basketService.getTripQuantity(trip);
  }
}
