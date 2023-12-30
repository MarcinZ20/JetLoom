import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-btn-to-top',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './btn-to-top.component.html',
  styleUrl: './btn-to-top.component.css'
})
export class BtnToTopComponent {
  faArrowUp = faArrowUp;
  btnToTop = document.getElementById('btn-to-top');

  constructor() { 
    // Renderer2.listen('window', 'scroll', () => {
    //   this.showBtn();
    // });
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  showBtn() {
    if ((document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) && this.btnToTop) {
      this.btnToTop.style.display = 'block';
    } else if (this.btnToTop) {
      this.btnToTop.style.display = 'none';
    }
  }
}
