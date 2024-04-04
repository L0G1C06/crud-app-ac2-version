import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  login() {
    this.http.post('http://localhost:8000/api/login', { username: this.user, password: this.password }, { responseType: 'text' })
      .subscribe((response: string) => {
        if (response === 'User loged in sucessfully!') {
          this.router.navigate(['/app']);
        }
      }, (error) => {
        console.error('Error:', error);
        alert('User or password are incorrect!');
        this.user = '';
        this.password = '';
      });
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
