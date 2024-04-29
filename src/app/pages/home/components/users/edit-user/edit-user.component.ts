import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {
  edituserForm: FormGroup;
  editUrl = 'http://0.0.0.0:8000/api/v1/user/update'

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private http: HttpClient) {
    this.edituserForm = this.formBuilder.group({
      user: ['', Validators.required], 
      email: ['', [Validators.required, Validators.email]],  
      role: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]], 
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.edituserForm.patchValue({
        user: params['user'],
        email: params['email'],
        role: params['role'],
        password: params['password']
      });
    })
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

  //editUser(): void {
  //  if (this.edituserForm.valid) {
  //    console.log('New User');
  //    alert('Usuário editado com sucesso!');
  //    this.router.navigate(['/app']);
  //  } else {
  //    this.edituserForm.markAllAsTouched(); 
  //    alert('Preencha corretamente todos os campos!');
  //  }
  //}
  editUser(username: string, email: string, role: string, password: string){
    const body = {username, email, role, password}
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(this.editUrl, body, { headers })
  }

  onSubmit(){
    if (this.edituserForm.valid){
      const {user, email, role, password} = this.edituserForm.value;
      this.editUser(user, email, role, password).subscribe(
        () => {
          alert('Usuário editado com sucesso!')
          this.router.navigate(['/app']);
        },
      );
    } else {
      alert('Preencha corretamente todos os campos!')
    }
  }
}