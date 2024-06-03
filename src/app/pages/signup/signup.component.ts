import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  userForm: FormGroup;

  email: string = '';
  user: string = '';
  password: string = '';

  constructor(private router: Router, private formBuilder: FormBuilder, private signupService: SignupService) {
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

  onSubmit(){
    if (this.userForm.valid){
      const {user, email, password} = this.userForm.value;
      this.signupService.signup(user, email, password).subscribe(
        () => {
          alert('Usuário registrado com sucesso!')
          this.router.navigate(['/login']);
        },
        (error: HttpErrorResponse) => {
          if (error.status === 409){
            alert('Usuário já existe');
          } else {
            console.error('Erro ao registrar usuário:', error.message)
            alert('Ocorreu um erro ao registrar o usuário. Por favor, tente novamente mais tarde.');
          }
        }
      );
    } else {
      alert('Preencha corretamente todos os campos!')
    }
  }
}