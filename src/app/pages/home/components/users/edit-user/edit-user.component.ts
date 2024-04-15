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

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.edituserForm = this.formBuilder.group({
      user: ['', Validators.required], 
      email: ['', [Validators.required, Validators.email]],  
      role: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]], 
    });
  }

  get user() { return this.edituserForm.get('user'); } 
  get email() { return this.edituserForm.get('email'); } 
  get role() { return this.edituserForm.get('role'); } 
  get password() { return this.edituserForm.get('password'); } 

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
      alert('Usuário adicionado com sucesso!');
      this.router.navigate(['/app']);
    } else {
      this.edituserForm.markAllAsTouched(); 
      alert('Preencha corretamente todos os campos!');
    }
  }
}
