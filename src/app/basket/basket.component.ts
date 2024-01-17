import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faEnvelope, faLock, faRightLeft, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css'
})
export class BasketComponent {

  faTrash = faTrash;
  faEnvelope = faEnvelope;
  faLock = faLock;
  faRightLeft = faRightLeft;
  faInfoCircle = faInfoCircle;
}
