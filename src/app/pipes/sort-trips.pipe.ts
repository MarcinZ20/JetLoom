import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from '../trip';
import { ReviewService } from '../services/review.service';

@Pipe({
  name: 'sortTrips',
  standalone: true
})
export class SortTripsPipe implements PipeTransform {

  constructor(private reviewService: ReviewService) {}

  transform(trips: Trip[], option: string): Trip[] {
    console.log('Sorting trips')
    switch (option) {
      case 'lowestPrice':
        return trips.sort((a, b) => a.Price - b.Price);
      case 'highestPrice':
        return trips.sort((a, b) => b.Price - a.Price);
      case 'az':
        return trips.sort((a, b) => a.TripName.localeCompare(b.TripName));
      case 'za':
        return trips.sort((a, b) => b.TripName.localeCompare(a.TripName));
      case 'shortestDuration':
        console.log('shortestDuration')
        return trips.sort((a, b) => (Number(a.EndDate) - Number(a.StartDate)) - (Number(b.EndDate) - Number(b.StartDate)));
      case 'longestDuration':
        console.log('longestDuration')
        return trips.sort((a, b) => (Number(b.EndDate) - Number(b.StartDate)) - (Number(a.EndDate) - Number(a.StartDate)));
      case 'highestRating':
        return trips.sort((a, b) => {
          let aRating = this.reviewService.getAverageRating(a);
          let bRating = this.reviewService.getAverageRating(b);
          return bRating - aRating;
        });
      case 'lowestRating':
        return trips.sort((a, b) => {
          let aRating = this.reviewService.getAverageRating(a);
          let bRating = this.reviewService.getAverageRating(b);
          return aRating - bRating;
        });
      default:
        return trips;
    }
  }

}
