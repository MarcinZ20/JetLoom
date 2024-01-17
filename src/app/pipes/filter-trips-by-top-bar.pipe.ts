import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from '../trip';

@Pipe({
  name: 'filterTripsByTopBar',
  standalone: true,
})
export class FilterTripsByTopBarPipe implements PipeTransform {
  transform(trips: Trip[], data: string[]): Trip[] {

    if (!trips) return [];
    if (!data || data.length === 0) return trips;

    let destination = data[0].toLowerCase().trim();
    const startDate = data[1] ? new Date(data[1]) : null;
    const endDate = data[2] ? new Date(data[2]) : null;

    if (destination) {
      trips = trips.filter((trip) => {
        return trip.Country.toLowerCase().includes(destination) || trip.City.toLowerCase().includes(destination);
      });
    }

    console.log('Trips after destination filter end');

    if (startDate) {
      trips = trips.filter((trip) => {
        return new Date(trip.StartDate) >= startDate;
      });
    }

    console.log('Trips after start date filter end');

    if (endDate) {
      trips = trips.filter((trip) => {
        return new Date(trip.EndDate) <= endDate;
      });
    }

    console.log('Trips after end date filter end');

    return trips;
  }
}
