import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { BtnToTopComponent } from './btn-to-top/btn-to-top.component';
import { TripsService } from './services/trips.service';
import { CurrencyExchangeRatesService } from './services/currency-exchange-rates.service';
import { BasketService } from './services/basket.service';
import { ReviewService } from './services/review.service';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    HttpClientModule,
    RouterOutlet, 
    NavbarComponent, 
    FooterComponent, 
    BtnToTopComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [TripsService, CurrencyExchangeRatesService, BasketService, ReviewService, NotificationService]
})
export class AppComponent {
  title = 'JetLoom';
}
