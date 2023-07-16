import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(
      private router: Router,
      private authService: AuthService
  ) { }

  canActivate(): boolean {
      const isLoggedIn = this.authService.userValue;
      if (isLoggedIn) {
        return true; // Route can be activated
      } else {
        // Redirect to a different route or show an error message
        this.router.navigate(['/login']); // Navigate to the login route
        return false; // Route cannot be activated
      }
  }
}
