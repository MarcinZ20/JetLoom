import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faUser,
  faShoppingCart,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { BasketService } from '../services/basket.service';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  faUser = faUser;
  faShoppingCart = faShoppingCart;
  faSignOutAlt = faSignOutAlt;

  @ViewChild('navbarBurger') navbarBurger: ElementRef;
  @ViewChild('navbarMenu') navbarMenu: ElementRef;

  basketSize: number;
  navbarOpen: boolean;

  constructor(
    private router: Router,
    private basketService: BasketService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.basketService.getItemCount().subscribe((count) => {
      this.basketSize = count;
    });

    this.navbarOpen = false;
  }

  toggleNavbar() {
    console.log(this.navbarOpen);
    this.navbarOpen = !this.navbarOpen;

    if (this.navbarOpen) {
      console.log('Clicked navbar burger: open');
      this.renderer.removeClass(this.navbarBurger.nativeElement, 'is-active');
      this.renderer.removeClass(this.navbarMenu.nativeElement, 'is-active');
      return;
    }

    if (!this.navbarOpen) {
      console.log('Clicked navbar burger: closed');
      this.renderer.addClass(this.navbarBurger.nativeElement, 'is-active');
      this.renderer.addClass(this.navbarMenu.nativeElement, 'is-active');
      return;
    }
  }

  // Functions
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
