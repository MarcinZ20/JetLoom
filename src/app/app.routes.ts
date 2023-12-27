import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { TripComponent } from './trip/trip.component';
import { TripsComponent } from './trips/trips.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'trips', component: TripsComponent },
    { path: 'trip', component: TripComponent },
    { path: 'trip/:id', component: TripComponent },
    {path: 'contact', component: ContactComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: ErrorPageComponent }
];

export const routing = RouterModule.forRoot(routes);