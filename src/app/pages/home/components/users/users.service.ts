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
  private token = this.getCookie('authToken');

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
