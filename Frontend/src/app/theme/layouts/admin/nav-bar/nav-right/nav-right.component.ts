/* eslint-disable @typescript-eslint/no-explicit-any */
// angular import
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { UserSessionService } from 'src/app/services/UserSession/UserSession.service';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent implements OnInit {
  UserData: Employee;
  token: any;

  constructor(
    private usersessionService: UserSessionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.UserData = this.usersessionService.getSession();
  }
  // public method
  logout() {
    localStorage.removeItem('token');
    this.usersessionService.clearSession();
    this.router.navigate(['login']);
  }
}
