/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
  private readonly SESSION_KEY = 'currentUser';

  constructor() {}
  setSession(user: any) {
    sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
  }

  getSession(): any {
    const userString = sessionStorage.getItem(this.SESSION_KEY);
    return userString ? JSON.parse(userString) : null;
  }

  clearSession() {
    sessionStorage.removeItem(this.SESSION_KEY);
  }
}
