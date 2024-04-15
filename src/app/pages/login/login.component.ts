import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login(){
    if (this.user === 'admin' && this.password === '1234'){
      this.router.navigate(['/app'])
    } else {
      alert('Usuário ou senha estão incorretos!')
      this.user = '';
      this.password = '';
    }
  }
  goToSignup(){
    this.router.navigate(['/signup']);
  }
}