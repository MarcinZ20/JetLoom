import { Component, Input, OnInit } from '@angular/core';
import { Trip } from '../trip';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-added-trip-notification',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './added-trip-notification.component.html',
  styleUrl: './added-trip-notification.component.css'
})
export class AddedTripNotificationComponent implements OnInit {
  constructor() {}

  @Input() public trip: Trip;
  public showNotification = false;

  ngOnInit(): void {
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
    } , 3000);
  }
}
