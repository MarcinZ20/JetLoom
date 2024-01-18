import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private _notification = new Subject<string>();
  public notification$ = this._notification.asObservable();

  constructor() { }

  showNotification(message: string) {
    this._notification.next(message);
  }
}
