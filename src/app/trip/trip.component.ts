import { Component, OnInit } from '@angular/core';
import { Trip } from '../trip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCalendar,
  faCalendarAlt,
  faPlus,
  faMinus,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { TripsService } from '../services/trips.service';
import { BasketService } from '../services/basket.service';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { CurrencyExchangeRatesService } from '../services/currency-exchange-rates.service';
import { ReviewService } from '../services/review.service';
import { ReviewComponent } from '../review/review.component';
import { ReviewFormComponent } from '../review-form/review-form.component';

@Component({
  selector: 'app-trip',
  standalone: true,
  imports: [
    FontAwesomeModule,
    RouterModule,
    HttpClientModule,
    CommonModule,
    NgFor,
    NgIf,
    ReviewComponent,
    ReviewFormComponent,
  ],
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.css',
})
export class TripComponent implements OnInit {
  // Properties
  trip: Trip;

  private _quantity: number = 0;
  public currency: string;

  // Icons
  faCalendar = faCalendar;
  faCalendarAlt = faCalendarAlt;
  faPlus = faPlus;
  faMinus = faMinus;
  faArrowRight = faArrowRight;

  constructor(
    private router: ActivatedRoute,
    private tripService: TripsService,
    private basketService: BasketService,
    private currencyExchangeRatesService: CurrencyExchangeRatesService
  ) {}

  ngOnInit(): void {
    const tripId = this.router.snapshot.params['id'];

    if (tripId) {
      this.tripService.getTrip(tripId).subscribe((trip) => {
        this.trip = trip;
        this.initMap()
        console.log('Trip avalibility' + this.getTripAvailability());
      });
    }

    this.currencyExchangeRatesService.getCurrency().subscribe((currency) => {
      this.currency = currency;
    });
  }

  initMap() {
    const address = this.trip.City + ', ' + this.trip.Country;
    console.log(address)

    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address: address }, (results, status) => {
      if (status === 'OK') {
        const map = new google.maps.Map(
          document.getElementById('map') as HTMLElement,
          {
            zoom: 8,
            center: results[0].geometry.location,
          }
        );

        map.setCenter(results[0].geometry.location);
        new google.maps.Marker({
          map: map,
          position: results[0].geometry.location,
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  addToCart() {
    this.basketService.addToBasket(this.trip);
    console.log('Availibility: ' + this.getTripAvailability());
  }

  removeFromCart() {
    this.basketService.removeFromBasket(this.trip);
    console.log('Availibility: ' + this.getTripAvailability());
  }

  addToFavorites() {
    console.log('Added to favorites: ' + this.trip.TripName);
  }

  getTripAvailability() {
    return this.trip.MaxCapacity - this.basketService.getTripQuantity(this.trip);
  }
}
