import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

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
      } catch (error: any) {
        console.log('New User:', newUser);
        alert('User successfully registered!');
        this.router.navigate(['/login']);
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
      await firstValueFrom(this.http.post(url, newUser, { headers }));
      return;
    } catch (error: any) {
      throw error;
    }
  }
}
