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
