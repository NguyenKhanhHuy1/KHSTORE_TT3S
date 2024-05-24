/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserSessionService } from 'src/app/services/UserSession/UserSession.service';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss']
})
export class GuestComponent implements OnInit {
  constructor(
    private router: Router,
    private usersessionService: UserSessionService
  ) {}
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/Orders/List']);
    } else {
      this.router.navigate(['login']);
    }
  }
}
