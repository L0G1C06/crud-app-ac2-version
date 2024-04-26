import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  userForm: FormGroup;
  signupUrl = 'http://0.0.0.0:8000/api/v1/user/signup'

  email: string = '';
  user: string = '';
  password: string = '';

  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient) {
    this.userForm = this.formBuilder.group({
      user: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    }, { validator: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(formGroup: FormGroup){
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password !== confirmPassword){
      formGroup.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }

  signup(username: string, email: string, password: string){
    const body = {username, email, password}
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.signupUrl, body, { headers })
  }

  onSubmit(){
    if (this.userForm.valid){
      const {user, email, password} = this.userForm.value;
      this.signup(user, email, password).subscribe(
        () => {
          this.router.navigate(['/login']);
        },
        () => {
          alert('Usuário registrado com sucesso!')
        }
      );
    } else {
      alert('Preencha corretamente todos os campos!')
    }
  }
}