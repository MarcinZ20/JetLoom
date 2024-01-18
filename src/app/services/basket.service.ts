import { Injectable } from '@angular/core';
import { Trip } from '../trip';
import { Subject, Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private basket = new Map<Trip, number>();
  private basketSize = new BehaviorSubject<number>(0);

  setItemCount(count: number): void {
    this.basketSize.next(count);
  }

  getItemCount(): Observable<number> {
    return this.basketSize.asObservable();
  }

  getBasket(): Map<Trip, number> {
    return this.basket;
  }

  getBasketSize(): Observable<number> {
    return this.basketSize;
  }

  getTripQuantity(trip: Trip): number {
    return this.basket.get(trip) ?? 0;
  }

  getTripQuantityUsingId(id: number): number {
    let quantity = 0;
    this.basket.forEach((value, trip) => {
      if (trip.TripId === id) {
        quantity = value;
      }
    });
    return quantity;
  }

  updateBasketSize(): void {
    let size = 0;
    this.basket.forEach((quantity, trip) => {
      size += quantity;
    });
    this.basketSize.next(size);
    this.setItemCount(this.basket.size)
  }

  addToBasket(trip: Trip): void {
    const quantity = this.basket.get(trip);

    if (quantity) {
      this.basket.set(trip, quantity + 1);
    } else {
      this.basket.set(trip, 1);
    }

    this.updateBasketSize();
  }

  addToBasketUsingId(id: number): void {
    console.log('Inside basket service')
    this.basket.forEach((quantity, trip) => {
      console.log(trip)
      if (trip.TripId === id) {
        console.log('Found trip with id: ' + id);
        console.log('Adding trip to basket: ' + trip)
        this.addToBasket(trip);
        return;
      }
      console.log("Didn't find trip with id: " + id);
    });
  }

  removeFromBasket(trip: Trip): void {
    const quantity = this.basket.get(trip);

    if (quantity === 1) {
      this.deleteFromBasket(trip);
      return;
    }
    
    if (quantity) {
      this.basket.set(trip, quantity - 1);
      this.updateBasketSize();
    }
  }

  removeFromBasketUsingId(id: number): void {
    this.basket.forEach((quantity, trip) => {
      if (trip.TripId === id) {
        this.removeFromBasket(trip);
      }
    });
  }

  deleteFromBasket(trip: Trip): void {
    this.basket.delete(trip);
    this.updateBasketSize();
  }

  deleteFromBasketUsingId(id: number): void {
    this.basket.forEach((quantity, trip) => {
      if (trip.TripId === id) {
        this.deleteFromBasket(trip);
      }
    });
  }

  updateTripQuantity(trip: Trip, quantity: number): void {
    if (quantity === 0) {
      this.removeFromBasket(trip);
      return;
    }

    this.basket.set(trip, quantity);
    this.updateBasketSize();
  }
}
