import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  adduserForm: FormGroup;
  addUrl = 'http://0.0.0.0:8000/api/v1/user/add'

  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient) {
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

  addUser(username: string, email: string, role: string, password: string){
    const body = {username, email, role, password}
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.addUrl, body, { headers })
  }

  onSubmit(){
    if(this.adduserForm.valid){
      const {user, email, role, password} = this.adduserForm.value;
      this.addUser(user, email, role, password).subscribe(
        () => {
          alert('Usuário adicionado com sucesso!');
          this.router.navigate(['/app/users']);
        },
        () => {
          alert('Usuário adicionado com sucesso!');
        }
      );      
    } else {
      alert('Preencha corretamente todos os campos!')
    }
  }
}
