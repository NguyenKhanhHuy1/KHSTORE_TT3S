// angular import
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/Orders/List']);
    } else {
      this.router.navigate(['login']);
    }
  }
  constructor(private router: Router) {}
  // public props
  navCollapsed: boolean;
  navCollapsedMob: boolean = false;

  // public method
  navMobClick() {
    if (this.navCollapsedMob && !document.querySelector('app-navigation.coded-navbar').classList.contains('mob-open')) {
      this.navCollapsedMob = !this.navCollapsedMob;
      setTimeout(() => {
        this.navCollapsedMob = !this.navCollapsedMob;
      }, 100);
    } else {
      this.navCollapsedMob = !this.navCollapsedMob;
    }
  }
}
