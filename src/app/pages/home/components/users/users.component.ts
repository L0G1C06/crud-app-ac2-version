import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private router: Router) { }
  removeUser(user: string){
    this.users = this.users.filter(usuario => usuario.user !== user);
  }
  editUserId(user: any, email: any){
    this.router.navigate(['/app/users/edit', { user: user, email: email}]);
  }
}
