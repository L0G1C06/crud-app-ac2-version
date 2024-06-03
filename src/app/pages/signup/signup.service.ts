import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class SignupService {
    private apiUrl = 'http://0.0.0.0:8000/users/register'

    constructor(private http: HttpClient) { }

    signup(username: string, email: string, password: string): Observable<any> {
        const body = { username, email, password }
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' })

        return this.http.post(this.apiUrl, body, { headers }).pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError(error)
            })
        )
    }
}