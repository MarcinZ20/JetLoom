import { Trip } from './trip';

export class Trips {
    trips: Trip[] = [];

    // FIXME: This is not working - Make trip.Capacity = trip.MaxCapacity
    constructor(trips: Trip[]) {
        this.trips = trips;
        for (let trip of this.trips) {
            trip.Capacity = trip.MaxCapacity;
        }
    }
}