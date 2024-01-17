import { Component, OnInit } from '@angular/core';
import { Trip } from '../trip';
import { HttpClientModule } from '@angular/common/http';
import { TripsService } from '../services/trips.service';
import { FormControl, ReactiveFormsModule, FormGroup, Validators} from '@angular/forms';
import { linkValidator} from '../validators/link-validation.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLink, faLocationDot, faCalculator, faPen, faEarthAmerica} from '@fortawesome/free-solid-svg-icons';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    FontAwesomeModule, 
    HttpClientModule, 
    NgIf, 
    NgFor],
    templateUrl: './add-trip.component.html',
    styleUrl: './add-trip.component.css',
    providers: [TripsService]
})
export class AddTripComponent implements OnInit {

  TripForm: FormGroup;
  tags: string[] = [];

  constructor(private service: TripsService) { }

  ngOnInit(): void {
    this.TripForm = new FormGroup({
      TripName: new FormControl('', [
        Validators.required,
        linkValidator(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/i)
      ]),
      TripCountry: new FormControl(''),
      TripCity: new FormControl(''),
      TripDescription: new FormControl(''),
      TripStartDate: new FormControl(''),
      TripEndDate: new FormControl(''),
      TripPrice: new FormControl(''),
      TripPriceCurrency: new FormControl(''),
      TripCapacity: new FormControl(''),
      TripImage: new FormControl(''),
      TripTags: new FormControl('')
    });

    this.tags = [];
  }

  faLink = faLink;
  faLocationDot = faLocationDot;
  faCalculator = faCalculator;
  faPen = faPen;
  faEarthAmerica = faEarthAmerica;

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
      default:
        return price;
    }
  }

  // FIXME: Add trip form does not work (When clicking to add tags, submit button is triggered)
  onSubmit() {
    const tripData = this.TripForm.value;

    const newTrip: Trip = {
      TripName: tripData.TripName || '',
      Country: tripData.TripCountry || '',
      City: tripData.TripCity || '',
      Description: tripData.TripDescription || '',
      StartDate: this.isValidDate(tripData.TripStartDate || '') ? new Date(tripData.TripStartDate || '') : new Date(),
      EndDate: this.isValidDate(tripData.TripEndDate || '') ? new Date(tripData.TripEndDate || '') : new Date(),
      MaxCapacity: Number(tripData.TripCapacity) || 20,
      Capacity: Number(tripData.TripCapacity),
      Image: tripData.TripImage || '',
      Price: this.changeCurrency(tripData.TripPriceCurrency || '', Number(tripData.TripPrice)) || 2000,
      Tags: this.tags,
    }
    console.log(newTrip);
    this.service.addTrip(newTrip);
  }

  addTag() {
    const inputElement = document.getElementById('tag-input') as HTMLInputElement;
    const tag = inputElement.value;
    
    if (!this.checkTagsCount()) {
        return;
    }

    if (tag === '') {
      return;
    }

    this.tags.push(this.normalizeTag(tag));
    inputElement.value = '';
  }

  checkTagsCount() {
    if (this.tags.length <= 5) {
      return true;
    }
    return false;
  }

  removeTag(tag: string) {
    console.log(tag);
    const index = this.tags.indexOf(tag);
    this.tags.splice(index, 1);
  }

  private isValidDate(dateString: string): boolean {
    return !isNaN(Date.parse(dateString));
  }

  private normalizeTag(tag: string): string {

    tag = tag.toLowerCase().trim().replace(/\s/g, '');

    if (tag.startsWith('#')) {
      tag = tag.slice(1);
    }

    return '#' + tag;
  }
}