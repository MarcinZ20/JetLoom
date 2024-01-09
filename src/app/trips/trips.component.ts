import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { Trips } from '../trips';
import { TripComponent } from '../trip/trip.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SortTripsByPricePipe } from '../pipes/sort-trips-by-price.pipe';
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
import { getDataService } from '../../services/getDataService';
import { Trip } from '../trip';

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [
    NgFor,
    HttpClientModule,
    FontAwesomeModule,
    TripComponent,
    SortTripsByPricePipe,
  ],
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.css',
})
export class TripsComponent {
  // Data
  tripsData: Trips;

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

  constructor(private http: HttpClient) {
    this.tripsData = new Trips();
    // this.tripsData = service.fetchTrips();
    this.fetchTrips();
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
    // 1. Kiedy 5 < capacity < maxCapacity
    if (trip.Capacity > 5 && trip.Capacity <= trip.MaxCapacity) {
      document.getElementById('remove-button')?.removeAttribute('disabled');
    }

    // 2. Kiedy capacity <= 5
    if (trip.Capacity === 6) {
      document.getElementById('trip')?.classList.add('has-background-warning');
    }

    // 3. Kiedy capacity === 1
    if (trip.Capacity === 1) {
      document.getElementById('buy-button')?.setAttribute('disabled', 'true');
      // TODO: some kind of overlay
      document.getElementById('trip')?.classList.add('has-background-grey-dark');
    }

    // 4. Kiedy capacity === 0
    if (trip.Capacity === 0) {
      return;
    }

    trip.Capacity--;
    console.log('Capacity: ' + trip.Capacity);
  }

  removeFromCart(trip: Trip) {
    // 1. If capacity === maxCapacity
    if (trip.Capacity === trip.MaxCapacity) {
      return;
    }

    // 2. If capacity = maxCapacity - 1
    if (trip.Capacity === trip.MaxCapacity - 1) {
      document.getElementById('remove-button')?.setAttribute('disabled', 'true');
    }

    // 3. If capacity = 5
    if (trip.Capacity === 5) {
      document.getElementById('trip')?.classList.remove('has-background-warning');
    }

    if (trip.Capacity === 0) {
      document.getElementById('buy-button')?.attributes.removeNamedItem('disabled');
      document.getElementById('trip')?.classList.remove('has-background-grey-dark');
    }

    trip.Capacity++;
    console.log('Capacity: ' + trip.Capacity);
  }

  addToFavorites(trip: Trip) {
    console.log('Added to favorites: ' + trip.TripName);
  }

  // TODO: Implement
  // All kinds of sorting
  // Filter by price
  // Filter by duration
  // Filter by location
  // Filter by rating
  // Filter by date
  // Filter by type
  // Filter by name

  // TODO: Implement
  // Buttons for sorting
  // Buttons for filtering
  // Buttons for pagination
}
