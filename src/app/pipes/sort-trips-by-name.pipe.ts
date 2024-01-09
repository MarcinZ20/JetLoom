import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from '../trip';

@Pipe({
  name: 'sortTripsByName',
  standalone: true,
})
export class SortTripsByNamePipe implements PipeTransform {
  transform(trips: Trip[], isDescending: boolean = false): Trip[] {
    return trips.sort((a, b) =>
      isDescending ? b.TripName.localeCompare(a.TripName) : a.TripName.localeCompare(b.TripName)
    );
  }
}
