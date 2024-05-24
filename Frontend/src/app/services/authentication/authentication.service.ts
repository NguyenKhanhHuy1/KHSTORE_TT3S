/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserSessionService } from '../UserSession/UserSession.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements CanActivate {
  constructor(
    private router: Router,
    private usersessionService: UserSessionService
  ) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    const decodedToken = this.decodeToken(token);
    this.usersessionService.setSession(decodedToken);
    const user = this.usersessionService.getSession();
    if (token && user) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
  decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}
