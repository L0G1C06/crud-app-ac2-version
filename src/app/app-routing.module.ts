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

const routes: Routes = [
  {path: "", redirectTo: "/login", pathMatch: 'full'},
  {path: "login", component: LoginComponent},
  {
    path: "app", component: HomeComponent,
    children: [
      {path: "", component: WelcomeComponent},
      {path: "users", component: UsersComponent},
      {path: "users/add", component: AddUserComponent},
      {path: "users/edit", component: EditUserComponent},
      {path: "users/todo", component: TodoComponent}
    ]
  },
  {path: "signup", component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
