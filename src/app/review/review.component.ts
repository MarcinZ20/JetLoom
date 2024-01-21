import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../review';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css',
})
export class ReviewComponent implements OnInit {
  @Input() review: Review;

  constructor() {}

  ngOnInit(): void {}
}
