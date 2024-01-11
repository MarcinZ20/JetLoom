import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from '../trip';

@Pipe({
  name: 'sortTrips',
  standalone: true
})
export class SortTripsPipe implements PipeTransform {

  transform(trips: Trip[], option: string): Trip[] {
    console.log('Sorting trips by option: ', option);
    switch (option) {
      case 'lowestPrice':
        return trips.sort((a, b) => a.Price - b.Price);
      case 'highestPrice':
        return trips.sort((a, b) => b.Price - a.Price);
      case 'az':
        return trips.sort((a, b) => a.TripName.localeCompare(b.TripName));
      case 'za':
        return trips.sort((a, b) => b.TripName.localeCompare(a.TripName));
      case 'shortestDuration':
        return trips.sort((a, b) => (Number(a.EndDate) - Number(a.StartDate)) - (Number(b.EndDate) - Number(b.StartDate)));
      case 'longestDuration':
        return trips.sort((a, b) => (Number(b.EndDate) - Number(b.StartDate)) - (Number(a.EndDate) - Number(a.StartDate)));
      default:
        return trips;
    }
  }

}
