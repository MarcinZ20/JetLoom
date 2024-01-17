import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, CurrencyPipe } from '@angular/common';

import { Trips } from '../trips';
import { Trip } from '../trip';
import { TripComponent } from '../trip/trip.component';
import { SortTripsPipe } from '../pipes/sort-trips.pipe';
import { FilterTripsByTagPipe } from '../pipes/filter-trips-by-tag.pipe';
import { FilterTripsByTopBarPipe } from '../pipes/filter-trips-by-top-bar.pipe';
import { FilterTripsByPricePipe } from '../pipes/filter-trips-by-price.pipe';
import { TripsService } from '../services/trips.service';
import { CurrencyExchangeRatesService } from '../services/currency-exchange-rates.service';
import { AddTripComponent } from '../add-trip/add-trip.component';
import { FormControl, FormGroup } from '@angular/forms';

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
  faMoneyBillAlt
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
    FilterTripsByPricePipe,
    CurrencyPipe,
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
  public selectedCurrency: string = 'EUR';
  public exchangeRate = 1;
  public selectedTags: string[] = [];
  public selectedTopBarFilter: string[] = [];
  public selectedSideBarFilter: number[] = [];

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
  faMoneyBillAlt = faMoneyBillAlt;

  constructor(
    private service: TripsService, 
    private currencyService: CurrencyExchangeRatesService) {
    this.trips = [];
  }

  ngOnInit() {

    // Get trips list
    this.service.fetchTrips().then((data: Trips) => {
      this.trips = data.trips;
    });

    // Get currency exchange rates
    this.currencyService.getCurrencyExchangeRates().subscribe((data) => {
      console.log('Currency exchange rates: ', data)
      this.exchangeRate = data.rates[this.selectedCurrency];
    });

    console.log('Exchange rate: ' + this.exchangeRate)

    this.topFilterForm = new FormGroup({
      DestinationFilter: new FormControl(''),
      StartDateFilter: new FormControl(''),
      EndDateFilter: new FormControl(''),
    });

    this.sideFilterForm = new FormGroup({
      PriceFrom: new FormControl(''),
      PriceTo: new FormControl(''),
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
  }

  filterTripsByPrice() {
    let filterData = this.sideFilterForm.value;

    const price_from = filterData.PriceFrom || null;
    const price_to = filterData.PriceTo || null;

    this.selectedSideBarFilter = [price_from, price_to, this.exchangeRate];

    this.sideFilterForm.reset();
  }

  updateExchangeRate() {
    this.currencyService.getCurrencyExchangeRates().subscribe((data) => {
      console.log('Currency exchange rates: ', data)
      this.exchangeRate = data.rates[this.selectedCurrency];
    });
  }

  convertPriceToSelectedCurrency(number: number) {
    return number * this.exchangeRate;
  }
}
