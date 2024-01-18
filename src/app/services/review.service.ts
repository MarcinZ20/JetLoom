import { Injectable, OnInit } from '@angular/core';
import { Review } from '../review';
import { BehaviorSubject } from 'rxjs';
import { Trip } from '../trip';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService  implements OnInit{

  private reviewsSubject = new BehaviorSubject<Review[]>([]);
  public data$: Observable<Review[]> = this.reviewsSubject.asObservable();


  constructor() {
  }

  ngOnInit(): void {

  }

  addReview(review: Review) {
    console.log('Adding review: ' + review);
    const currentReviews = this.reviewsSubject.getValue();
    this.reviewsSubject.next([...currentReviews, review]);
  }

  deleteReview(review: Review) {
    console.log('Deleting review: ' + review);
    const currentReviews = this.reviewsSubject.getValue();
    const index = currentReviews.indexOf(review);
    if (index > -1) {
      currentReviews.splice(index, 1);
    }
    this.reviewsSubject.next(currentReviews);
  }

  editReview(review: Review, newReview: Review) {
    console.log('Editing review: ' + review);
    const currentReviews = this.reviewsSubject.getValue();
    const index = currentReviews.indexOf(review);
    if (index > -1) {
      currentReviews[index] = newReview;
    }
    this.reviewsSubject.next(currentReviews);
  }

  getReviews(trip: Trip) {
    return trip.Reviews;
  }

  getAverageRating(trip: Trip) {
    const reviews = trip.Reviews;
    let sum = 0;
    for (let review of reviews) {
      sum += review.Rating;
    }
    return sum / reviews.length;
  }

  getReviewsCount(trip: Trip) {
    return trip.Reviews.length;
  }
}
