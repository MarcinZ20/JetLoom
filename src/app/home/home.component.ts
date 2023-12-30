import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEarthAmericas, faHome, faMapPin, faMoneyBill, faPlaneDeparture, faShoppingCart, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  faEarthAmericas = faEarthAmericas;
  faHome = faHome;
  faMapPin = faMapPin;
  faMoneyBill = faMoneyBill;
  faPlaneDeparture = faPlaneDeparture;
  faShoppingCart = faShoppingCart;
  faPlus = faPlus;
  faMinus = faMinus;
}
