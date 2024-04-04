import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  email: string = '';
  user: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  async signup() {
    if (this.email && this.user && this.password && this.password.length >= 8) {
      const newUser = {
        email: this.email,
        username: this.user,
        password: this.password
      };

      try {
        await this.createNewUser(newUser);
        console.log('New User:', newUser);
        alert('User successfully registered!');
        this.router.navigate(['/login']); 
      } catch (error) {
        console.error('Error when registering user:', error);
        alert('There was an error registering the user. Please try again.');
      }
    } else {
      alert('Please fill in all the fields correctly.');
    }
  }

  private async createNewUser(newUser: any): Promise<void> {
    const url = 'http://localhost:8000/api/register';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    try {
      await this.http.post(url, newUser, { headers }).toPromise();
      return; // Explicitly return void here
    } catch (error) {
      throw error;
    }
  }
}
