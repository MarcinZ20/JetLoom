import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trip } from '../trip';
import { Trips } from '../trips';

@Injectable({
  providedIn: 'root'
})
export class TripsService {
  
  data: Trips;
  private apiUrl = '../../assets/data/trips.json';
  
  constructor(private http: HttpClient) {
    this.data = { trips: [] };
  }

  addTrip(trip: Trip) {
    this.data.trips.push(trip);
  }

  removeTrip(trip: Trip) {
    this.data.trips = this.data.trips.filter(t => t !== trip);
  }

  getTrips(): Trip[] {
    return this.data.trips;
  }

  fetchTrips(path: string = this.apiUrl): Promise<Trips> {
    return new Promise<Trips>((resolve, reject) => {
      this.http.get<Trips>(path)
        .subscribe((data: Trips) => {
          this.data = data;
          resolve(data);
          this.data.trips.forEach(trip => {
            trip.Capacity = trip.MaxCapacity;
          });
          reject("Error: " + data);
        });
    });
  }
}
