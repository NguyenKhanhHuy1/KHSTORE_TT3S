/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './ScrollToTop.component.html',
  styleUrls: ['./ScrollToTop.component.css']
})
export class ScrollToTopComponent {
  isShow: boolean = false;

  // Hiển thị nút scroll khi cuộn trang
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if ((window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) > 300) {
      this.isShow = true;
    } else if (this.isShow && (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) < 10) {
      this.isShow = false;
    }
  }

  // Cuộn trang lên đầu
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
