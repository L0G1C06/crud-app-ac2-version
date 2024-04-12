import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      user: ['', Validators.required],
      email: [''],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  }

  signup(): void {
    if (this.userForm.valid){
      console.log('New User');
      alert('User successfully registered!');
      this.router.navigate(['/login']);
    } else {
      alert('Please fill all the fields correctly.');
    }
  }

  private async createNewUser(newUser: any): Promise<void> {
  }
}