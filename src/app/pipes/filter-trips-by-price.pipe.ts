import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from '../trip';
import { of } from 'rxjs';

@Pipe({
  name: 'filterTripsByPrice',
  standalone: true
})
export class FilterTripsByPricePipe implements PipeTransform {

  transform(trips: Trip[], prices: number[]): Trip[] {
    if (!trips) return [];
    if (!prices || prices.length === 0) return trips;
    
    let price_from = prices[0]
    let price_to = prices[1]
    let exchange_rate = prices[2]

    if (!price_from && !price_to) {
      return trips
    }

    if (!price_from) {
      return trips.filter(trip => (
        trip.Price * exchange_rate <= price_to
      ))
    }

    if (!price_to) {
      return trips.filter(trip => (
        trip.Price * exchange_rate >= price_from
      ))
    }

    return trips.filter(trip => (
      trip.Price * exchange_rate >= price_from && trip.Price * exchange_rate <= price_to
    ))
  }

}
