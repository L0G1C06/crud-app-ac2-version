import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
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
        this.users = users.data;
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching users:', error);
        this.isLoading = false;
      }
    );
  }

  removeUser(id: number) {
    this.users = this.users.filter(user => user.ID !== id);
    // Adicione a requisição HTTP para excluir o usuário do servidor, se necessário
  }

  editUser(id: number, user: string, email: string, role: string) {
    this.router.navigate(['/app/users/edit', { id: id, user: user, email: email, role: role }]);
  }
}
