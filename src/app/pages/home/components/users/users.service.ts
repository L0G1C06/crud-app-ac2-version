import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface User {
    ID: number;
    Username: string; // Mudança de 'user' para 'name'
    Email: string;
    Role: string;
}

export interface UserRoleCount {
    Role: string;
    Count: number;
  }

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsersCount(): Observable<number> {
    return this.http.get<number>('http://0.0.0.0:8000/api/v1/users/count');
  }

  fetchUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://0.0.0.0:8000/api/v1/users/list').pipe(
      catchError(error => {
        console.error('Error fetching users:', error);
        throw error;
      })
    );
  }

  fetchUserRoles(): Observable<UserRoleCount[]> {
    return this.http.get<UserRoleCount[]>('http://0.0.0.0:8000/api/v1/users/list').pipe(
      catchError(error => {
        console.error('Error fetching user roles:', error);
        throw error;
      })
    );
  }

}
