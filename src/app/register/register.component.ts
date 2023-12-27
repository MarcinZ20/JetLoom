import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faKey, faPerson } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  faEnvelope = faEnvelope;
  faKey = faKey;
  faPerson = faPerson;
}
