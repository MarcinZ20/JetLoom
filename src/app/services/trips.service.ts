import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trip } from '../trip';
import { Trips } from '../trips';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FilterTripsByPricePipe } from '../pipes/filter-trips-by-price.pipe';
import { FilterTripsByTagPipe } from '../pipes/filter-trips-by-tag.pipe';
import { FilterTripsByTopBarPipe } from '../pipes/filter-trips-by-top-bar.pipe';
import { SortTripsPipe } from '../pipes/sort-trips.pipe';
import { combineLatest } from 'rxjs';
import { ReviewService } from './review.service';

@Injectable({
  providedIn: 'root',
})
export class TripsService {
  private tripsSubject = new BehaviorSubject<Trip[]>([]);
  public data$: Observable<Trip[]> = this.tripsSubject.asObservable();

  private apiUrl = '../../assets/data/trips.json';

  private filterCriteria = new BehaviorSubject<any>({});
  private sortCriteria = new BehaviorSubject<string>('');

  constructor(private http: HttpClient, private reviewService: ReviewService) {
    this.fetchTrips().subscribe();
    this.reviewService.data$.subscribe((data) => {
      console.log('Review service data: ' + data);
    });
  }

  public fetchTrips(path: string = this.apiUrl): Observable<Trips> {
    return this.http.get<Trips>(path).pipe(
      tap((data) => {
        this.tripsSubject.next(data.trips);
      })
    );
  }

  getSortedAndFilteredTrips(): Observable<Trip[]> {
    return this.data$.pipe(
      map((trips) => this.applyFilter(trips, this.filterCriteria.value)),
      map((trips) => this.applySort(trips, this.sortCriteria.value))
    );
  }

  getTrips(): Observable<Trip[]> {
    return combineLatest([
      this.data$,
      this.filterCriteria,
      this.sortCriteria,
    ]).pipe(
      map(([trips, filterCriteria, sortCriteria]) => {
        let filteredTrips = this.applyFilter(trips, filterCriteria);
        let sortedTrips = this.applySort(filteredTrips, sortCriteria);
        return sortedTrips;
      })
    );
  }

  addTrip(trip: Trip) {
    console.log('Adding trip: ' + trip);
    const currentTrips = this.tripsSubject.getValue();
    this.tripsSubject.next([...currentTrips, trip]);
  }

  removeTrip(trip: Trip): void {
    console.log('Removing trip: ' + trip);
    const currentTrips = this.tripsSubject.getValue();
    this.tripsSubject.next(currentTrips.filter((t) => t !== trip));
  }

  setFilterCriteria(criteria: any) {
    this.filterCriteria.next(criteria);
  }

  // Metoda do ustawiania kryteriów sortowania
  setSortCriteria(criteria: string) {
    this.sortCriteria.next(criteria);
  }

  // Metody do aplikowania filtracji i sortowania
  applyFilter(trips: Trip[], criteria: any): Trip[] {
    const filterByTagPipe = new FilterTripsByTagPipe();
    const filterByTopBarPipe = new FilterTripsByTopBarPipe();
    const filterByPricePipe = new FilterTripsByPricePipe();

    trips = filterByTagPipe.transform(trips, criteria.tag);
    trips = filterByTopBarPipe.transform(trips, criteria.topBar);
    trips = filterByPricePipe.transform(trips, criteria.price);

    return trips;
  }

  applySort(trips: Trip[], criteria: string): Trip[] {
    const sortTripsPipe = new SortTripsPipe(this.reviewService);
    return sortTripsPipe.transform(trips, criteria);
  }

  getTripsCount(): Observable<number> {
    return this.data$.pipe(
      map((trips) => {
        return trips.length as number;
      })
    );
  }

  getTrip(id: number): Observable<Trip> {
    console.log('Id: ' + id);
    console.log(this.data$);
    return this.data$.pipe(
      map((trips) => {
        return trips.find((trip) => trip.TripId == id) as Trip;
      })
    );
  }

  getTheMostExpensiveTripId(): Observable<number> {
    return this.data$.pipe(
      map((trips) => {
        return trips.reduce((prev, current) =>
          prev.Price > current.Price ? prev : current
        ).TripId;
      })
    );
  }

  getTheLeastExpensiveTripId(): Observable<number> {
    return this.data$.pipe(
      map((trips) => {
        return trips.reduce((prev, current) =>
          prev.Price < current.Price ? prev : current
        ).TripId;
      })
    );
  }

  // ----------------- PIPES -----------------

  public filterTripsByPrice(trips: Trip[], data: number[]): Trip[] {
    console.log('Filtering trips by price');
    return new FilterTripsByPricePipe().transform(trips, data);
  }

  public filterTripsByTag(trips: Trip[], tags: string[]): Trip[] {
    console.log('Filtering trips by tag');
    return new FilterTripsByTagPipe().transform(trips, tags);
  }

  public filterTripsByTopBar(trips: Trip[], data: string[]): Trip[] {
    console.log('Filtering trips by top bar');
    return new FilterTripsByTopBarPipe().transform(trips, data);
  }

  public sortTrips(trips: Trip[], sortType: string): Trip[] {
    console.log('Sorting trips');
    return new SortTripsPipe(this.reviewService).transform(trips, sortType);
  }

  // ----------------- UTILS -----------------

  getMostExpensiveTrip(trips: Trip[]): Trip {
    return trips.reduce((prev, current) =>
      prev.Price > current.Price ? prev : current
    );
  }

  getLeastExpensiveTrip(trips: Trip[]): Trip {
    return trips.reduce((prev, current) =>
      prev.Price < current.Price ? prev : current
    );
  }

  generateTripId(): number {
    return this.tripsSubject.getValue().length + 1;
  }
}
