import { Component, Inject } from '@angular/core';
import { Trip } from '../trip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendar, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-trip',
  standalone: true,
  imports: [FontAwesomeModule],
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
  Capacity: number;
  Description: string;
  Image: string;
  Tags: string[];

  // Icons
  faCalendar = faCalendar;
  faCalendarAlt = faCalendarAlt;

  constructor() {}

  initialize(
    tripName: string,
    destination: string,
    startDate: string,
    endDate: string,
    price: number,
    maxCapacity: number,
    capacity: number,
    description: string,
    image: string,
    tags: string[]
  ) {
    this.TripName = tripName;
    this.Destination = destination;
    this.StartDate = startDate;
    this.EndDate = endDate;
    this.Price = price;
    this.MaxCapacity = maxCapacity;
    this.Capacity = capacity;
    this.Description = description;
    this.Image = image;
    this.Tags = tags;
  }

  // Getters
  getTripName() {
    return this.TripName;
  }

  getDestination() {
    return this.Destination;
  }

  getStartDate() {
    return this.StartDate;
  }

  getEndDate() {
    return this.EndDate;
  }

  getPrice() {
    return this.Price;
  }

  getMaxCapacity() {
    return this.MaxCapacity;
  }

  getDescription() {
    return this.Description;
  }

  // Observables
  menu = document.querySelector('section.container .tabs ul li:nth-child(2)');

  // Functions
}
