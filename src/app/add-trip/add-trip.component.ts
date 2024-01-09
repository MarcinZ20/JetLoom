import { Component } from '@angular/core';
import { Trip } from '../trip';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLink, faLocationDot, faCalculator, faPen} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './add-trip.component.html',
  styleUrl: './add-trip.component.css'
})
export class AddTripComponent {

  TripName = new FormControl('');
  TripDestination = new FormControl('');
  TripDescription = new FormControl('');
  TripStartDate = new FormControl('');
  TripEndDate = new FormControl('');
  TripPrice = new FormControl('');
  TripCapacity = new FormControl('');
  TripImage = new FormControl('');
  TripTags = new FormControl('');

  constructor() { }

  faLink = faLink;
  faLocationDot = faLocationDot;
  faCalculator = faCalculator;
  faPen = faPen;
}
