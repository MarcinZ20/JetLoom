import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Input } from '@angular/core';
import { Review } from '../review';
import { ReviewService } from '../services/review.service';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [FormsModule, NgFor, ReactiveFormsModule],
  templateUrl: './review-form.component.html',
  styleUrl: './review-form.component.css',
})
export class ReviewFormComponent implements OnInit {
  @Input() tripId: number;
  @Output() reviewAdded = new EventEmitter<void>();

  reviewForm: FormGroup;

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.reviewForm = new FormGroup({
      ReviewTitle: new FormControl('', [Validators.required]),
      ReviewerName: new FormControl('', [Validators.required]),
      ReviewText: new FormControl('', [Validators.required]),
      ReviewRating: new FormControl('', [Validators.required]),
    });
  }

  addReview() {
    const date: Date = new Date(Date.now());

    const review: Review = {
      ReviewId: this.randomNumber(),
      Title: this.reviewForm.value.ReviewTitle,
      ReviewerName: this.reviewForm.value.ReviewerName,
      ReviewText: this.reviewForm.value.ReviewText,
      Rating: this.reviewForm.value.ReviewRating,
      TripId: this.tripId,
      ReviewDate: date,
    };

    this.reviewService.addReview(review);
    this.reviewAdded.emit();
  }

  randomNumber(): number {
    return Math.floor(Math.random() * 1000000);
  }
}
