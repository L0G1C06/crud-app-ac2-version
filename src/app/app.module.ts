import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './pages/home/components/navbar/navbar.component';
import { UsersComponent } from './pages/home/components/users/users.component';
import { WelcomeComponent } from './pages/home/components/welcome/welcome.component';
import { RouterModule } from '@angular/router';
import { AddUserComponent } from './pages/home/components/users/add-user/add-user.component';
import { EditUserComponent } from './pages/home/components/users/edit-user/edit-user.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { TodoComponent } from './pages/home/components/users/todo/todo.component';
import { AuthGuardService } from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    NavbarComponent,
    UsersComponent,
    WelcomeComponent,
    AddUserComponent,
    EditUserComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('accessToken'),
        allowedDomains: ['localhost'],
        disallowedRoutes: []
      }
    })
  ],
  providers: [
    provideHttpClient(withFetch()),
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }