import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  adduserForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService) {
    this.adduserForm = this.formBuilder.group({
      user: ['', Validators.required], 
      email: ['', [Validators.required, Validators.email]],  
      role: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]], 
    });
  }

  get user() { return this.adduserForm.get('user'); } 
  get email() { return this.adduserForm.get('email'); } 
  get role() { return this.adduserForm.get('role'); } 
  get password() { return this.adduserForm.get('password'); } 

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
    if(this.adduserForm.valid){
      const {user, email, role, password} = this.adduserForm.value;
      this.userService.addUser(user, email, role, password).subscribe(
        () => {
          alert('Usuário adicionado com sucesso!');
          this.router.navigate(['/app/users']);
        },
        (error: HttpErrorResponse) => {
          if(error.status === 409){
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
