import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService) {
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { user, password } = this.loginForm.value;
      this.loginService.login(user, password).subscribe(
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
