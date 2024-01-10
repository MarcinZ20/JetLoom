import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { Trips } from '../trips';
import { Trip } from '../trip';
import { TripComponent } from '../trip/trip.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { SortTripsPipe } from '../pipes/sort-trips.pipe';
import { TripsService } from '../services/trips.service';

import {
  faHeart,
  faMinus,
  faPlus,
  faArrowRight,
  faStar,
  faStarHalf,
  faStarHalfStroke,
  faHome,
  faMoneyBillWave,
  faArrowUpWideShort,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [
    NgFor,
    HttpClientModule,
    FontAwesomeModule,
    TripComponent,
    FormsModule,
    SortTripsPipe,
  ],
  providers: [TripsService],
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.css',
})
export class TripsComponent implements OnInit{
  // Data
  tripsData: Trips;
  selectedOption: string = 'lowestPrice';

  // Icons
  faPlus = faPlus;
  faMinus = faMinus;
  faHeart = faHeart;
  faArrowRight = faArrowRight;
  faStar = faStar;
  faStarHalf = faStarHalf;
  faStarHalfStroke = faStarHalfStroke;
  faHome = faHome;
  faMoneyBillWave = faMoneyBillWave;
  faArrowUpWideShort = faArrowUpWideShort;

  constructor(private http: HttpClient,
              private service: TripsService
    ) {
      this.tripsData = { trips: [] };
    }
    
    async ngOnInit() {
      this.service.fetchTrips().then((data: Trips) => {
        this.tripsData = data;
      });
    }

  fetchTrips(path: string = '../../assets/data/trips.json') {
    this.http.get<Trips>(path).subscribe((data: Trips) => {
      this.tripsData = data;
    });
  }

  getTripsCount() {
    return this.tripsData.trips.length;
  }

  addToCart(trip: Trip) {
    trip.Capacity--;
  }

  removeFromCart(trip: Trip) {
    trip.Capacity++;
  }

  addToFavorites(trip: Trip) {
    console.log('Added to favorites: ' + trip.TripName);
  }

  getHighestPriceTrip() {
    return this.tripsData.trips.reduce((highest, trip) => {
      return trip.Price > highest.Price ? trip : highest;
    }, this.tripsData.trips[0]);
  }

  getLowestPriceTrip() {
    return this.tripsData.trips.reduce((lowest, trip) => {
      return trip.Price < lowest.Price ? trip : lowest;
    }, this.tripsData.trips[0]);
  }

  // TODO: Implement
  // All kinds of filtering
  // Filter by price
  // Filter by duration
  // Filter by location
  // Filter by rating
  // Filter by date
  // Filter by type
  // Filter by name

  // TODO: Implement
  // Sort by duration
}
