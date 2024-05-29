import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from 'rxjs/operators';

export interface Task {
  tasktitle: string,
  taskdescription: string,
  taskaction: boolean,
  username: string
}
@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private url = 'http://localhost:8000/todo/list'
    private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RlIiwiaWF0IjoxNzE2OTI1MzYzLCJleHAiOjE3MTcwOTgxNjN9.TW6Ac9iXq2qwM6TVgH59ax_Wo8A8Dcfxy_vKJMISujA'
    
    private getHeaders(): HttpHeaders {
      return new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    }

    constructor(private http: HttpClient) {}

    fetchTasks(): Observable<Task[]> {
      return this.http.get<Task[]>(`${this.url}`, { headers: this.getHeaders() }).pipe(
        catchError(error => {
          console.error('Error fetching tasks:', error)
          throw error
        })
      )
    }
}