import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, User } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  isLoading = true;

  constructor(
    private router: Router,
    private userService: UserService 
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.fetchUsers().subscribe(
      (users: any) => {
        console.log(users)
        this.users = users;
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching users:', error);
        this.isLoading = false;
      }
    );
  }

  removeUser(username: string) {
    this.userService.deleteUser(username).subscribe(
      () => {
        this.users = this.users.filter(user => user.username !== username)
        console.log('User deleted successfully!')
      },
      (error) => {
        console.error('Error deleting user: ', error)
      }
    )
  }

  editUser(id: number, user: string, email: string, role: string) {
    this.router.navigate(['/app/users/edit', { id: id, user: user, email: email, role: role }]);
  }
}
