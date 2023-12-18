import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trips } from '../app/trips';


@Injectable({
  providedIn: 'root',
})

export class getDataService {

  private apiUrl = '../assets/trips.json';

  constructor(private http: HttpClient) {}

  fetchTrips(path: string = this.apiUrl) : any {
    console.log("fetchTrips() called");
    this.http.get<Trips>(path)
      .subscribe((data: Trips) => {
        return data;
      }
    );
  }
}