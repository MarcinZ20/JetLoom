import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from '../trip';

@Pipe({
  name: 'sortTripsByPrice',
  standalone: true,
})
export class SortTripsByPricePipe implements PipeTransform {
  transform(trips: Trip[], isDescending: boolean = false): Trip[] {
    return trips.sort((a, b) =>
      isDescending ? b.Price - a.Price : a.Price - b.Price
    );
  }
}
