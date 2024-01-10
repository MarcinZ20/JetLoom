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
    this.data = {
      trips: []
    };
   }

  //  FIXME: This is not working
  addTrip(trip: Trip) {
    console.log("Inside Service: " + typeof trip);
    this.data.trips.push(trip);
    console.log("Inside Service check: " + this.data.trips[-2].Capacity);
  }

  fetchTrips(path: string = this.apiUrl): Promise<Trips> {
    return new Promise<Trips>((resolve, reject) => {
      this.http.get<Trips>(path)
        .subscribe((data: Trips) => {
          this.data = data;
          resolve(data);
          reject("Error: " + data);
          console.log("Inside Service: " + data);
        });
    });
  }
}
