import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly AUTH_KEY = 'isAutenticated';

  login() {
    localStorage.setItem(this.AUTH_KEY, 'true');
  }

  logout() {
    localStorage.removeItem(this.AUTH_KEY);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.AUTH_KEY) == 'true';
    /* const isUserAuth = localStorage.getItem(this.AUTH_KEY) == 'true';
    if (isUserAuth) {
      this.router.navigate(['']);
      return isUserAuth;
    } else {
      return false;
    } */
  }
}
