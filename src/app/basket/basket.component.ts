import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faTrash,
  faEnvelope,
  faLock,
  faRightLeft,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { Trip } from '../trip';
import { NgFor, NgIf, NgSwitchCase } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BasketService } from '../services/basket.service';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrencyExchangeRatesService } from '../services/currency-exchange-rates.service';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [
    FontAwesomeModule,
    NgFor,
    NgIf,
    NgSwitchCase,
    RouterModule,
    CurrencyPipe,
    FormsModule,
    NgStyle,
  ],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css',
})
export class BasketComponent implements OnInit {
  faTrash = faTrash;
  faEnvelope = faEnvelope;
  faLock = faLock;
  faRightLeft = faRightLeft;
  faInfoCircle = faInfoCircle;

  public basket: Map<Trip, number>;
  public currency: string;

  constructor(
    private basketService: BasketService,
    private currencyExchangeRatesService: CurrencyExchangeRatesService
  ) {}

  ngOnInit(): void {
    this.basket = this.basketService.getBasket();
    this.currencyExchangeRatesService.getCurrency().subscribe((currency) => {
      this.currency = currency;
    });
  }

  deleteTripFromBasket(trip: Trip): void {
    this.basketService.deleteFromBasket(trip);
    this.basket = this.basketService.getBasket();
  }

  getBasketTotalPrice(): number {
    let totalPrice = 0;
    this.basket.forEach((quantity, trip) => {
      totalPrice += trip.Price * quantity;
    });
    return totalPrice;
  }

  updateTripQuantity(event: Event, trip: Trip): void {
    const newQuantity = parseInt((event.target as HTMLInputElement).value);
    this.basketService.updateTripQuantity(trip, newQuantity);
    this.basket = this.basketService.getBasket();
  }
}
