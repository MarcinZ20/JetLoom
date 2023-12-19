import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { Trips } from '../trips';
import {  } from './trip/trip.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faShare, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { GetTripsService } from '../get-trips.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [NgFor, FontAwesomeModule, HttpClientModule],
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.css',
  providers: [GetTripsService, HttpClientModule]
})

export class TripsComponent implements OnInit {
  // Data
  tripsData: Trips;

  // Icons
  faShoppingBasket= faShoppingCart;
  faShare = faShare;
  faHeart = faHeart;

  constructor(private service: GetTripsService) {
  }

  ngOnInit() {
    this.getTrips();
  }

  getTrips() {
    this.service.fetchTrips().subscribe(
      (data: Trips) => {
        this.tripsData = data;
      }
    );
  }
}
