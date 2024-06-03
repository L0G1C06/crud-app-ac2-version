import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {
  edituserForm: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private userService: UserService) {
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

  onSubmit(){
    if (this.edituserForm.valid){
      const {user, email, role, password} = this.edituserForm.value;
      const username = this.route.snapshot.params['user']
      this.userService.editUser(username, user, email, role, password).subscribe(
        () => {
          alert('Usuário editado com sucesso!')
          this.router.navigate(['/app']);
        },
        (error) => {
          if (error.status === 404) {
            alert('Usuário não encontrado. Verifique o nome de usuário.')
          } else {
            alert('Ocorreu um erro ao editar o usuário. Por favor, tente novamente mais tarde.')
          }
        }
      );
    } else {
      alert('Preencha corretamente todos os campos!')
    }
  }
}