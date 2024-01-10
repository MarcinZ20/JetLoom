import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { Trips } from '../trips';
import { Trip } from '../trip';
import { TripComponent } from '../trip/trip.component';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { SortTripsPipe } from '../pipes/sort-trips.pipe';
import { TripsService } from '../services/trips.service';
import { AddTripComponent } from '../add-trip/add-trip.component';
import { DatePipe } from '@angular/common';

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
    DatePipe,
    AddTripComponent,
  ],
  providers: [TripsService],
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.css',
})
export class TripsComponent implements OnInit{

  public trips: Trip[];
  public selectedOption: string = 'lowestPrice';

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

  constructor(private service: TripsService) {
    this.trips = [];
  }
    
  ngOnInit() {
    console.log("ngOnInit - TripsComponent");
    this.service.fetchTrips().then((data: Trips) => {
      this.trips = data.trips;
      this.trips.forEach((trip) => {
        trip.StartDate = new Date(trip.StartDate);
        trip.EndDate = new Date(trip.EndDate);
      });
    });
    this.trips = this.service.getTrips();
  }

  getTripsCount() {
    return this.trips.length;
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
    return this.trips.reduce((highest, trip) => {
      return trip.Price > highest.Price ? trip : highest;
    }, this.trips[0]);
  }

  getLowestPriceTrip() {
    return this.trips.reduce((lowest, trip) => {
      return trip.Price < lowest.Price ? trip : lowest;
    }, this.trips[0]);
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
