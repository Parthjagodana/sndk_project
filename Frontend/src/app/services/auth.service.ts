import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const baseUrl = `${environment.apiUrl}/auth`;
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User | null>(null);
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    if (!this.userSubject.value) {
      const getUserKey = window.sessionStorage.getItem(USER_KEY);
      if (getUserKey) {
        this.userSubject.next(JSON.parse(getUserKey));
      }
    }
    return this.userSubject.value;
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(
        `${baseUrl}/signIn`,
        { email, password },
        { withCredentials: true }
      )
      .pipe(
        map((user) => {
          this.userSubject.next(user);
          window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
          return user;
        })
      );
  }

  register(user: User) {
    return this.http.post(`${baseUrl}/signUp`, user);
  }

  logout() {
    this.userSubject.next(null);
    window.sessionStorage.removeItem(USER_KEY);
    this.router.navigate(['/login']);
  }
}
