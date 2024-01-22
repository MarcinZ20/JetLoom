import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, CurrencyPipe } from '@angular/common';

import { Trip } from '../trip';
import { PaginatePipe } from '../pipes/paginate.pipe';
import { SortTripsPipe } from '../pipes/sort-trips.pipe';
import { FilterTripsByTagPipe } from '../pipes/filter-trips-by-tag.pipe';
import { FilterTripsByTopBarPipe } from '../pipes/filter-trips-by-top-bar.pipe';
import { FilterTripsByPricePipe } from '../pipes/filter-trips-by-price.pipe';
import { TripsService } from '../services/trips.service';
import { BasketService } from '../services/basket.service';
import { CurrencyExchangeRatesService } from '../services/currency-exchange-rates.service';
import { ReviewService } from '../services/review.service';
import { FormControl, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
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
  faMoneyBillAlt,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    SortTripsPipe,
    FilterTripsByTagPipe,
    FilterTripsByTopBarPipe,
    FilterTripsByPricePipe,
    CurrencyPipe,
    PaginatePipe,
    DatePipe,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.css',
})
export class TripsComponent implements OnInit, OnDestroy {
  // Trips
  public trips: Trip[];

  public selectedOption: string = 'lowestPrice';
  public selectedCurrency: string;
  public exchangeRate = 1;
  public selectedTags: string[] = [];
  public selectedTopBarFilter: string[] = [];
  public selectedSideBarFilter: number[] = [];

  // Forms
  public topFilterForm: FormGroup;
  public sideFilterForm: FormGroup;

  // Pagination
  public currentPage: number = 1;
  public tripsPerPage: number = 10;
  private countSubscription: Subscription;
  public pagesCount: number;

  // TODO: Date Filters

  // Notification
  public showNotification = false;

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
  faTrash = faTrash;

  constructor(
    private service: TripsService,
    private basketService: BasketService,
    private currencyService: CurrencyExchangeRatesService,
    private reviewService: ReviewService
  ) {}

  ngOnInit() {
    // Get trips list
    this.service.getTrips().subscribe((trips) => {
      this.trips = trips;
    });

    // Observable to get trips count
    this.countSubscription = this.getTripsCount().subscribe((count) => {
      this.pagesCount = count;
    });

    // Get currency exchange rates
    this.currencyService.getCurrencyExchangeRates().subscribe((data) => {
      if (data && data.rates && data.rates[this.selectedCurrency] && this.selectedCurrency) {
      this.exchangeRate = data.rates[this.selectedCurrency];
      } else {
        console.error('Error getting currency exchange rates');
      }
    });

    // Get currency
    this.currencyService.getCurrency().subscribe((currency) => {
      this.selectedCurrency = currency;
    });

    this.topFilterForm = new FormGroup({
      DestinationFilter: new FormControl(''),
      StartDateFilter: new FormControl(''),
      EndDateFilter: new FormControl(''),
    });

    this.sideFilterForm = new FormGroup({
      PriceFrom: new FormControl(''),
      PriceTo: new FormControl(''),
    });

    // Get reviews
    this.trips.forEach((trip) => {
      trip.Reviews = this.getReviews(trip);
    });
  }

  ngOnDestroy() {
    this.topFilterForm.reset();
    this.sideFilterForm.reset();
    this.countSubscription.unsubscribe();
  }

  getTripsCount(): Observable<number> {
    return this.service.getTripsCount();
  }

  getAllTags(): string[] {
    return this.service.getAllTags();
  }

  // Basket logic
  calculateTripAvailability(trip: Trip) {
    return trip.MaxCapacity - this.basketService.getTripQuantity(trip);
  }

  addToCart(trip: Trip) {
    this.basketService.addToBasket(trip);
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
  }

  removeFromCart(trip: Trip) {
    this.basketService.removeFromBasket(trip);
  }

  addToFavorites(trip: Trip) {
    console.log('Added to favorites: ' + trip.TripName);
  }

  getHighestPriceTripId(): number {
    return this.service.getMostExpensiveTrip(this.trips).TripId;
  }

  getLowestPriceTrip(): number {
    return this.service.getLeastExpensiveTrip(this.trips).TripId;
  }

  // Exchange rates

  updateExchangeRate() {
    this.currencyService.getCurrencyExchangeRates().subscribe((data) => {
      this.exchangeRate = data.rates[this.selectedCurrency];
    });
    this.currencyService.setCurrency(this.selectedCurrency);
  }

  convertPriceToSelectedCurrency(number: number) {
    return number * this.exchangeRate;
  }

  // Pagination

  nextPage(): void {
    if (this.currentPage < this.pagesCount) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToPage(pageNumber: number): void {
    console.log('Go to page: ', pageNumber);
    this.currentPage = pageNumber;
  }

  getPages(): number[] {
    return Array.from(
      Array(Math.ceil(this.trips.length / this.tripsPerPage)).keys()
    ).map((i) => i + 1);
  }

  paginate(trips: Trip[]): Trip[] {
    const startIndex = (this.currentPage - 1) * this.tripsPerPage;
    const endIndex = startIndex + this.tripsPerPage;
    return trips.slice(startIndex, endIndex);
  }

  // Reviews
  getReviews(trip: Trip) {
    console.log('Getting reviews for trip: ' + trip.TripName);
    return this.reviewService.getReviews(trip.TripId);
  }

  getAverageRating(trip: Trip) {
    return this.reviewService.getAverageRating(trip);
  }

  removeTrip(trip: Trip) {
    this.service.removeTrip(trip);
  }

  // Filters

  filterTripsByTopBar() {
    let filterData = this.topFilterForm.value;

    const destination = filterData.DestinationFilter || null;
    const startDate = filterData.StartDateFilter || null;
    const endDate = filterData.EndDateFilter || null;

    let trips: Trip[] = [];

    this.service.getTrips().subscribe((data) => {
      trips = data;
    });

    this.selectedTopBarFilter = [destination, startDate, endDate];

    this.trips = this.service.filterTripsByTopBar(
      trips,
      this.selectedTopBarFilter
    );

    // this.topFilterForm.reset();
  }

  filterTripsByPrice() {
    console.log('Filtering trips by price');
    let filterData = this.sideFilterForm.value;

    const price_from = filterData.PriceFrom || null;
    const price_to = filterData.PriceTo || null;

    this.selectedSideBarFilter = [price_from, price_to, this.exchangeRate];

    this.trips = this.service.filterTripsByPrice(
      this.trips,
      this.selectedSideBarFilter
    );

    this.sideFilterForm.reset();
  }

  sortTrips() {
    let sortedTrips = this.service.sortTrips(this.trips, this.selectedOption);
    this.trips = [...sortedTrips];
  }

  addTagToFilters(event: Event) {
    let checkbox = event.target as HTMLInputElement;
    let label = checkbox.parentElement;

    if (!checkbox || !label) return;

    let tag = '#' + label.innerText.trim();

    // Check if checkbox is checked
    if (checkbox.checked) {
      this.selectedTags = [...this.selectedTags, tag];
      this.filterTripsByTag(true);
      console.log('Added tag to filters: ', tag);
    }

    // If checkbox is not checked
    if (!checkbox.checked) {
      this.selectedTags = this.selectedTags.filter(
        (selectedTag) => selectedTag !== tag
      );
      console.log('Removed tag from filters: ', label.innerText.trim());
      this.filterTripsByTag(false);
    }
  }

  filterTripsByTag(add: boolean = true) {
    if (add) {
      this.trips = this.service.filterTripsByTag(this.trips, this.selectedTags);
      return;
    }

    let trips: Trip[] = [];

    this.service.getTrips().subscribe((data) => {
      trips = data;
    });

    this.trips = this.service.filterTripsByTag(trips, this.selectedTags);
  }

  resetFilters() {
    this.selectedTags = [];
    this.selectedTopBarFilter = [];
    this.selectedSideBarFilter = [];
    this.selectedOption = 'lowestPrice';
    this.trips = [];
    this.service.getTrips().subscribe((data) => {
      this.trips = data;
    });
  }
}
