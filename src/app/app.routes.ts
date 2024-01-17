import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { TripComponent } from './trip/trip.component';
import { TripsComponent } from './trips/trips.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { BasketComponent } from './basket/basket.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'trips', component: TripsComponent },
    { path: 'trip', component: TripComponent },
    { path: 'trip/:id', component: TripComponent },
    { path: 'contact', component: ContactComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'add-trip', component: AddTripComponent},
    { path: 'basket', component: BasketComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: ErrorPageComponent }
];

export const routing = RouterModule.forRoot(routes);