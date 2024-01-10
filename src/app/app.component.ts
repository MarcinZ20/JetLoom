import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { BtnToTopComponent } from './btn-to-top/btn-to-top.component';
import { TripsService } from './services/trips.service';

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
  providers: [TripsService]
})
export class AppComponent {
  title = 'JetLoom';

  constructor(private service: TripsService) { 
    console.log("AppComponent: constructor()");
    this.service.fetchTrips();
    console.log("AppComponent: constructor() - END");
  }
}
