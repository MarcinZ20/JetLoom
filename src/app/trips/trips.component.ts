import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { Trips } from '../trips';
import { Trip } from '../trip';
import { TripComponent } from '../trip/trip.component';
import { SortTripsPipe } from '../pipes/sort-trips.pipe';
import { FilterTripsByTagPipe } from '../pipes/filter-trips-by-tag.pipe';
import { FilterTripsByTopBarPipe } from '../pipes/filter-trips-by-top-bar.pipe';
import { TripsService } from '../services/trips.service';
import { AddTripComponent } from '../add-trip/add-trip.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    FilterTripsByTagPipe,
    FilterTripsByTopBarPipe,
    DatePipe,
    AddTripComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [TripsService],
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.css',
})
export class TripsComponent implements OnInit {
  public trips: Trip[];
  public selectedOption: string = 'lowestPrice';
  public selectedTags: string[] = [];
  public selectedTopBarFilter: string[] = [];
  public topFilterForm: FormGroup;
  public sideFilterForm: FormGroup;

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
    console.log('ngOnInit - TripsComponent');
    this.service.fetchTrips().then((data: Trips) => {
      this.trips = data.trips;
    });

    this.topFilterForm = new FormGroup({
      DestinationFilter: new FormControl(''),
      StartDateFilter: new FormControl(''),
      EndDateFilter: new FormControl(''),
    });

    this.sideFilterForm = new FormGroup({
      PriceFilter: new FormControl(''),
      RatingFilter: new FormControl(''),
    });
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

  addTagToFilters(event: Event) {
    let checkbox = event.target as HTMLInputElement;
    let label = checkbox.parentElement;

    if (!checkbox || !label) return;

    let tag = '#' + label.innerText.trim();

    // Check if checkbox is checked
    if (checkbox.checked) {
      this.selectedTags = [...this.selectedTags, tag];
      console.log('Added tag to filters: ', tag);
      return;
    }

    // If checkbox is not checked
    if (!checkbox.checked) {
      this.selectedTags = this.selectedTags.filter(
        (selectedTag) => selectedTag !== tag
      );
    }
    console.log('Removed tag from filters: ', label.innerText.trim());
  }

  filterTripsByDestinationAndDate() {
    let filterData = this.topFilterForm.value;

    const destination = filterData.DestinationFilter || '';
    const startDate = filterData.StartDateFilter || '';
    const endDate = filterData.EndDateFilter || '';

    this.selectedTopBarFilter = [destination, startDate, endDate];

    console.log('Filtering trips by destination and date');
    console.log('Destination: ', destination);
    console.log('Start date: ', startDate);
    console.log('End date: ', endDate);
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
}
