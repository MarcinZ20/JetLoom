import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from '../trip';

@Pipe({
  name: 'filterTripsByTopBar',
  standalone: true
})
export class FilterTripsByTopBarPipe implements PipeTransform {

  transform(trips: Trip[], data: string[]): Trip[] {

    if (!trips) return [];
    if (!data || data.length === 0) return trips;

    const destination = data[0];
    const startDate = new Date(data[1]);
    const endDate = new Date(data[2]);

    console.log(destination);
    console.log(startDate);
    console.log(endDate);

    // FIXME: Date comparision does not work properly
    return trips.filter(trip => (
      (destination === '' || trip.Country.includes(destination) || trip.City.includes(destination)) &&
      (trip.StartDate >= startDate && startDate !== new Date(0)) && 
      (trip.EndDate <= endDate && endDate !== new Date(0))
    ));
  }
}
