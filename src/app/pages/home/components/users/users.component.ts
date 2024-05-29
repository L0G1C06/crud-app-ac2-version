import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    private http: HttpClient,
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
    const deleteUrl = `http://0.0.0.0:8000/users/delete/${username}`;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RlIiwiaWF0IjoxNzE2OTE3MDc5LCJleHAiOjE3MTcwODk4Nzl9.tXh404G9_30WqL_mWqwEJz4-w_0DOhQEE974fEFZDOU';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  
    // Monta o corpo da requisição DELETE
    const body = {
      username: username
    };
    this.users = this.users.filter(user => user.username !== username);
  
    // Envia a requisição DELETE para a API
    this.http.delete(deleteUrl, { headers, body: JSON.stringify(body) }).subscribe(
      () => {
      },
      error => {
        console.error('Error deleting user:', error);
      }
    );
  }

  editUser(id: number, user: string, email: string, role: string) {
    this.router.navigate(['/app/users/edit', { id: id, user: user, email: email, role: role }]);
  }
}
