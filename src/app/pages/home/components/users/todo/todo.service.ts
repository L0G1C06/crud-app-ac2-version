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
    private token = this.getCookie('authToken')
    
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