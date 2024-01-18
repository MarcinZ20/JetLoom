import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faShoppingCart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { BasketService } from '../services/basket.service';
import { BasketWidgetComponent } from '../basket-widget/basket-widget.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule, BasketWidgetComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  
    faUser = faUser;
    faShoppingCart = faShoppingCart;
    faSignOutAlt = faSignOutAlt;

    basketSize: number;
  
    constructor(
      private router: Router,
      private basketService: BasketService) { }

    ngOnInit(): void {
      this.basketService.getItemCount().subscribe((count) => {
        this.basketSize = count;
      });
    }
  
    // Functions
    logout() {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
}
