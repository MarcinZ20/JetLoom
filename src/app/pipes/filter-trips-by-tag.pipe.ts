import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from '../trip';

@Pipe({
  name: 'filterTripsByTag',
  standalone: true
})
export class FilterTripsByTagPipe implements PipeTransform {

  transform(trips: Trip[], tags: string[]): Trip[] {
    console.log('Filtering trips by tags: ', tags);

    if (!trips) return [];
    if (!tags || tags.length === 0) return trips;
    
    return trips.filter(trip => tags.every(tag => trip.Tags.includes(tag)));
  }

}
