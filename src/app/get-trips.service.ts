import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trips } from '../app/trips';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetTripsService {

  private apiUrl = '../assets/data/trips.json';

  constructor(private http: HttpClient) { }

  fetchTrips(path: string = this.apiUrl): Observable<Trips> {
    return this.http.get<Trips>(path);
  }
}
