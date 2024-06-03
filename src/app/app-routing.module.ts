import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/home/components/users/users.component';
import { WelcomeComponent } from './pages/home/components/welcome/welcome.component';
import { AddUserComponent } from './pages/home/components/users/add-user/add-user.component';
import { EditUserComponent } from './pages/home/components/users/edit-user/edit-user.component';
import { TodoComponent } from './pages/home/components/users/todo/todo.component';
import { AuthGuardService } from './auth.guard';

const routes: Routes = [
  {path: "", redirectTo: "/login", pathMatch: 'full'},
  {path: "login", component: LoginComponent},
  {
    path: "app", component: HomeComponent, canActivate: [AuthGuardService],
    children: [
      {path: "", component: WelcomeComponent, canActivate: [AuthGuardService]},
      {path: "users", component: UsersComponent, canActivate: [AuthGuardService]},
      {path: "users/add", component: AddUserComponent, canActivate: [AuthGuardService]},
      {path: "users/edit", component: EditUserComponent, canActivate: [AuthGuardService]},
      {path: "users/todo", component: TodoComponent, canActivate: [AuthGuardService]}
    ]
  },
  {path: "signup", component: SignupComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
