import { Component, OnInit } from '@angular/core';
import { BasketService } from '../services/basket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-basket-widget',
  standalone: true,
  imports: [],
  templateUrl: './basket-widget.component.html',
  styleUrl: './basket-widget.component.css',
})
export class BasketWidgetComponent implements OnInit {

  basketSize: number;
  private basketSizeSubscription: Subscription;

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.basketSizeSubscription = this.basketService.getBasketSize().subscribe(size => {
      this.basketSize = size;
    }
    );
  };

  ngOnDestroy(): void {
    this.basketSizeSubscription.unsubscribe();
  }
}

