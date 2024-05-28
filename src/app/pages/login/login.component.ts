import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginUrl = 'http://0.0.0.0:8000/users/login';

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient) {
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(username: string, password: string) {
    const body = { username, password };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.loginUrl, body, { headers });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { user, password } = this.loginForm.value;
      this.login(user, password).subscribe(
        () => {
          this.router.navigate(['/app']);
        },
        () => {
          alert('Usuário ou senha estão incorretos!');
          this.resetForm();
        }
      );
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
