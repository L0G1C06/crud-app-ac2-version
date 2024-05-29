import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface User {
  ID: number;
  username: string;
  email: string;
  role: string;
}

export interface UserRoleCount {
  Role: string;
  Count: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://0.0.0.0:8000/users'; // Base API URL
  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RlIiwiaWF0IjoxNzE2OTE3MDc5LCJleHAiOjE3MTcwODk4Nzl9.tXh404G9_30WqL_mWqwEJz4-w_0DOhQEE974fEFZDOU';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
  }

  getUsersCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`, { headers: this.getHeaders() });
  }

  fetchUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/list`, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        console.error('Error fetching users:', error);
        throw error;
      })
    );
  }

  fetchUserRoles(): Observable<UserRoleCount[]> {
    return this.http.get<UserRoleCount[]>(`${this.apiUrl}/list`, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        console.error('Error fetching user roles:', error);
        throw error;
      })
    );
  }
}
