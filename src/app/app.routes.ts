import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { TripComponent } from './trips/trip/trip.component';
import { TripsComponent } from './trips/trips.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    {path: 'contact', component: ContactComponent},
    {path: 'trip', component: TripComponent},
    { path: 'trips', component: TripsComponent },
    // { path: 'trips/trip/:id', component: TripComponent, data: { title: 'Trip' } },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: ErrorPageComponent }
];

export const routing = RouterModule.forRoot(routes);