import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(): boolean {
    const isLoggedIn = this.authService.userValue;
    if (!isLoggedIn) {
      return true; // Route cannot be activated
    } else {
      // Redirect to a dashboard route
      this.router.navigate(['']);
      return false; // Route can be activated
    }
  }

}
