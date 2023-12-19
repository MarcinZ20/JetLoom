import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { Trips } from '../trips';
import { TripComponent } from '../trip/trip.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faShare, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
// import { getDataService } from "../../services/getDataService";

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [NgFor, HttpClientModule, FontAwesomeModule, TripComponent],
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.css',
})

export class TripsComponent {
  // Data
  tripsData: Trips;

  // Icons
  faShoppingBasket= faShoppingCart;
  faShare = faShare;
  faHeart = faHeart;

  constructor(
    private http: HttpClient) { 
    this.tripsData = new Trips();
    // this.tripsData = service.fetchTrips();
    this.fetchTrips();
  }

  fetchTrips(path: string = "../../assets/data/trips.json") {
    this.http.get<Trips>(path)
      .subscribe((data: Trips) => {
        this.tripsData = data;
      }
    );
  }
}
