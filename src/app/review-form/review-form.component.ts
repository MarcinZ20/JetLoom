import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Review } from '../review';
import { ReviewService } from '../services/review.service';
import { NgModel, FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './review-form.component.html',
  styleUrl: './review-form.component.css'
})
export class ReviewFormComponent implements OnInit {
  @Input() tripId: number;

  public rating: number = 0;
  public review: string = '';
  public name: string = '';
  public ratings: number[] = [1, 2, 3, 4, 5];
  public comment: string = '';
  public reviews: Review[] = [];
  public title: string = '';

  constructor(private reviewService: ReviewService) { 
  }

  ngOnInit(): void {
  }

  addReview() {

    const date: Date = new Date(Date.now());

    const review = new Review(
      this.tripId,
      this.title,
      date,
      this.name, 
      this.review, 
      this.rating, 
      );

    this.reviewService.addReview(review);
  }
}
