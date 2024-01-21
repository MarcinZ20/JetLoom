import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BasketService } from '../services/basket.service';

@Component({
  selector: 'app-added-trip-notification',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './added-trip-notification.component.html',
  styleUrl: './added-trip-notification.component.css',
})
export class AddedTripNotificationComponent implements OnInit {
  constructor(private basketService: BasketService) {}

  ngOnInit(): void {}

  closeNotification(): void {
    this.basketService.showNotification.next(false);
  }
}
