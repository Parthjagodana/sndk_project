import { Component } from '@angular/core';
import { User } from './models';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  user?: User | null;
  title = 'Frontend';

  constructor(private authService: AuthService) {
    this.authService.user.subscribe((x) => (this.user = x));
  }

  logout() {
    this.authService.logout();
  }
}
