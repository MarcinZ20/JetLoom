import { Component, Inject} from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Trip } from '../trip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faShare, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-trip',
  standalone: true,
  imports: [NgFor, NgIf, FontAwesomeModule],
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.css',
})

export class TripComponent implements Trip {
  // Properties
  TripName: string;
  Destination: string;
  StartDate: string;
  EndDate: string;
  Price: number;
  MaxCapacity: number;
  Description: string;
  Image: string;

  // Icons
  faShoppingBasket= faShoppingCart;
  faShare = faShare;
  faHeart = faHeart;

  constructor() { }

  initialize(
    tripName: string, 
    destination: string, 
    startDate: string, 
    endDate: string, 
    price: number, 
    maxCapacity: number, 
    description: string, 
    image: string) { 
    this.TripName = tripName;
    this.Destination = destination;
    this.StartDate = startDate;
    this.EndDate = endDate;
    this.Price = price;
    this.MaxCapacity = maxCapacity;
    this.Description = description;
    this.Image = image;
  }
}
