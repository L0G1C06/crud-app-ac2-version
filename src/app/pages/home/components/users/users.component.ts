import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

export interface UserByRole {
  [key: string]: number;
}

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent {
  users = [
    {user: 'changeme', email: 'changeme@gmail.com', role: 'Engenheiro de FE'},
    {user: 'changeme2', email: 'changeme2@gmail.com', role: 'Engenheiro de BE'},
    {user: 'changeme3', email: 'changeme3@gmail.com', role: 'Analista de dados'},
    {user: 'changeme4', email: 'changeme4@gmail.com', role: 'Lider Técnico'},
  ]
  
  constructor(private router: Router) {
    this.users = this.getUsers();
   }

  getUsers(){
    return this.users;
  }

  getUsersByRole(): UserByRole {
    const usersByRole: UserByRole = {};
    this.users.forEach(user => {
      if (!usersByRole[user.role]) {
        usersByRole[user.role] = 1;
      } else {
        usersByRole[user.role]++;
      }
    });
    return usersByRole;
  }

  removeUser(user: string){
    this.users = this.users.filter(usuario => usuario.user !== user);
  }

  editUserId(user: any, email: any){
    this.router.navigate(['/app/users/edit', { user: user, email: email}]);
  }
}
