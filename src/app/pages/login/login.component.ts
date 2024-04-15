import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      const { user, password } = this.loginForm.value;
      if (user === 'admin' && password === '1234') {
        this.router.navigate(['/app']);
      } else {
        alert('Usuário ou senha estão incorretos!');
        this.resetForm();
      }
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }

  resetForm() {
    this.loginForm.reset();
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
