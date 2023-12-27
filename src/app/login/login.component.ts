import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  faEnvelope = faEnvelope;
  faKey = faKey;
}
