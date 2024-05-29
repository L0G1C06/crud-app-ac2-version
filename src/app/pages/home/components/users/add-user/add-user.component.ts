import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  adduserForm: FormGroup;
  addUrl = 'http://0.0.0.0:8000/users/create'

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
    const token = this.getCookie('authToken')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
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

  getCookie(name: string): string | null {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  } 
}
