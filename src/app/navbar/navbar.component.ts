import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faShoppingCart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  
    faUser = faUser;
    faShoppingCart = faShoppingCart;
    faSignOutAlt = faSignOutAlt;
  
    constructor(private router: Router) { }
  
    // Functions
    logout() {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
}
