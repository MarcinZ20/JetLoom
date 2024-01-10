import { Component } from '@angular/core';
import { Trip } from '../trip';
import { HttpClientModule } from '@angular/common/http';
import { TripsService } from '../services/trips.service';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLink, faLocationDot, faCalculator, faPen} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, HttpClientModule],
  templateUrl: './add-trip.component.html',
  styleUrl: './add-trip.component.css',
  providers: [TripsService]
})
export class AddTripComponent {

  TripForm = new FormGroup({
    TripName: new FormControl(''),
    TripDestination: new FormControl(''),
    TripDescription: new FormControl(''),
    TripStartDate: new FormControl(''),
    TripEndDate: new FormControl(''),
    TripPrice: new FormControl(''),
    TripPriceCurrency: new FormControl(''),
    TripCapacity: new FormControl(''),
    TripImage: new FormControl(''),
    TripTags: new FormControl('')
  });

  constructor(private service: TripsService) { }

  faLink = faLink;
  faLocationDot = faLocationDot;
  faCalculator = faCalculator;
  faPen = faPen;

  
  onEnterKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
    // Append the component to the parent component

    // Start a new component
    // Add the component to the list of components
    }
  } 

  extractTags(tags: string): string[] {
    const tagArray = tags.split(',');
    return tagArray;
  }

  changeCurrency(symbol: string, price: number): number {
    switch (symbol) {
      case '$':
        return price * 0.79;
      case '€':
        return price * 0.86;
      case '¥':
        return price * 0.0054;
      case 'zł':
        return price * 0.2;
      default:
        return price;
    }
  }

  onSubmit() {
    const tripData = this.TripForm.value;

    const newTrip: Trip = {
      TripName: tripData.TripName || '',
      Destination: tripData.TripDestination || '',
      Description: tripData.TripDescription || '',
      StartDate: tripData.TripStartDate || '',
      EndDate: tripData.TripEndDate || '',
      MaxCapacity: Number(tripData.TripCapacity) || 0,
      Capacity: Number(tripData.TripCapacity) || 0,
      Image: tripData.TripImage || '',
      Price: this.changeCurrency(tripData.TripPriceCurrency || '', 
            Number(tripData.TripPrice)) || 0,
      Tags: this.extractTags(String(tripData.TripTags)) || [],
    }
    console.log(newTrip);
    this.service.addTrip(newTrip);
  }
}
