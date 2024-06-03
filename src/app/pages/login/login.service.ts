import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})

export class LoginService {
    private apiUrl = 'http://0.0.0.0:8000/users/login'

    constructor(private http: HttpClient) { }

    login(username: string, password: string): Observable<any> {
        const body = { username, password };
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' })

        return this.http.post(this.apiUrl, body, { headers }).pipe(
            tap((response: any) => {
                this.setToken(response.token)
            }),
            catchError(error => {
                return throwError(error)
            })
        )
    }

    private setToken(token: string): void {
        localStorage.setItem('authToken', token)
    }

}