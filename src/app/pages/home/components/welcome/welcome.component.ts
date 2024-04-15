import { Component } from '@angular/core';
import { UsersComponent } from '../users/users.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  lengthusers: any[];
  roleusers: any;
  
  constructor(private userLength: UsersComponent){
    this.lengthusers = this.userLength.getUsers();
    this.roleusers = this.userLength.getUsersByRole();
  }
}
