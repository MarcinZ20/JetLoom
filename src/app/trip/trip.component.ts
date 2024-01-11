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
  Country: string;
  City: string;
  StartDate: Date;
  EndDate: Date;
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

  // Observables
  menu = document.querySelector('section.container .tabs ul li:nth-child(2)');

  // Functions
}
