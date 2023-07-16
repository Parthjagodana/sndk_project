import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { User } from 'src/app/models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  userList: any = [];
  statusFilter: number = 2;
  search = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.fetchUsers();
  }

  //Get User List
  fetchUsers() {
    this.userService
      .getAllUser(this.statusFilter, this.search)
      .pipe(first())
      .subscribe((res: any) => (this.userList = res));
  }

  // Navigate to edit the user component
  editUserDetails(user: User) {
    this.userService.userData = user;
    this.router.navigate(['edit/' + this.userService.userData._id]);
  }
}
