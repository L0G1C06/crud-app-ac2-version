import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private url = 'http://localhost:8000/todo/list'
    private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RlIiwiaWF0IjoxNzE2OTI1MzYzLCJleHAiOjE3MTcwOTgxNjN9.TW6Ac9iXq2qwM6TVgH59ax_Wo8A8Dcfxy_vKJMISujA'
    private httpOptions = {
        headers: new HttpHeaders({
            Authorization: `Bearer ${this.token}`
        })
    }

    constructor(private http: HttpClient) {}

    getTasks(): Observable<any> {
      return this.http.get<any>(this.url, this.httpOptions)
        .pipe(
          catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse): Observable<any> {
      console.error('Erro na requisição:', error);
      throw error;
    }
}