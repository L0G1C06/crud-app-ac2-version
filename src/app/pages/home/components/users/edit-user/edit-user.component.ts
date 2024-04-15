import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
  edituserForm: FormGroup;

  user: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router, private formBuilder: FormBuilder){
    this.edituserForm = this.formBuilder.group({
      user: ['', Validators.required],
      email: [''],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
    }, { validator: this.passwordMatchValidator });
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

  editUser(): void {
    if (this.edituserForm.valid) {
      console.log('New User');
      alert('Usuário editado com sucesso!');
      this.router.navigate(['/app']);
    } else {
      const confirmPasswordControl = this.edituserForm.get('confirmPassword');
      if (confirmPasswordControl?.hasError('mismatch')) {
        alert('Senhas precisam ser iguais!');
      } else {
        alert('Preencha corretamente todos os campos!');
      }
    }
  }
}
