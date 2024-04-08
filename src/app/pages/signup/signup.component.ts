import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  email: string = '';
  user: string = '';
  password: string = '';

  constructor(private router: Router) {}

  signup() {
    if (this.email && this.user && this.password && this.password.length >= 8) {
      const newUser = {
        email: this.email,
        username: this.user,
        password: this.password
      };

      this.createNewUser(newUser).then(() => {
        console.log('New User:', newUser);
        alert('User successfully registered!');
        this.router.navigate(['/login']); 
      }).catch(error => {
        console.error('Error when registering user:', error);
        alert('There was an error registering the user. Please try again.');
      });
    } else {
      alert('Please fill in all the fields correctly.');
    }
  }

  private async createNewUser(newUser: any): Promise<void> {
  }
}