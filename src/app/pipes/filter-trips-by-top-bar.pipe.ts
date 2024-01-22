import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from '../trip';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'filterTripsByTopBar',
  standalone: true,
})
export class FilterTripsByTopBarPipe implements PipeTransform {
  transform(trips: Trip[], data: string[]): Trip[] {
    if (!trips) return [];
    if (!data || data.length === 0) return trips;

    const destination = data[0] ? data[0].toLowerCase().trim() : null;
    const startDate = data[1] ? new Date(data[1]) : null;
    const endDate = data[2] ? new Date(data[2]) : null;

    if (destination) {
      console.log('Destination: ' + destination);
      trips = trips.filter((trip) => {
        return (
          trip.Country.toLowerCase().includes(destination) ||
          trip.City.toLowerCase().includes(destination)
        );
      });
    }

    if (startDate) {
      console.log('Start date: ' + startDate);
      trips = trips.filter((trip) => {
        return new Date(trip.StartDate) >= startDate;
      });
    }

    if (endDate) {
      trips = trips.filter((trip) => {
        console.log('Trip end date: ' + trip.EndDate);
        console.log('End date: ' + endDate);
        return new Date(trip.EndDate) <= endDate;
      });
    }

    return trips;
  }
}
