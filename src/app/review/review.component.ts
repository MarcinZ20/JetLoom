import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../review';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent implements OnInit{
  @Input() review: Review;

  constructor() { }

  ngOnInit(): void {
    
  }

}
