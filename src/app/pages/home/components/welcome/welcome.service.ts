import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WelcomeService {
  private baseUrl = "http://0.0.0.0:8000/users";

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = this.getCookie('authToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getUserCount(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/count-roles`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  getUserRoles(): Observable<{ roleCounts: { [key: string]: number } }> {
    return this.http.get<{ roleCounts: { [key: string]: number } }>(`${this.baseUrl}/roles`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  private getCookie(name: string): string | null {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error fetching data:', error);
    return throwError('An error occurred while fetching data. Please try again later.');
  }
}
