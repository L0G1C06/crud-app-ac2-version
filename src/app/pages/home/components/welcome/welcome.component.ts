import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface ApiResponse {
  roleCounts: { [key: string]: number };
}

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  totalUsers: number = 0;
  baseUrl = "http://0.0.0.0:8000/users"
  private token = this.getCookie('authToken');
  userRoles: { role: string; count: number; }[] = []; 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUserCount();
    this.fetchUserRoles();
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
  }

  fetchUserCount(): void {
    this.http.get<any>(`${this.baseUrl}/count`, { headers: this.getHeaders() }).subscribe(
      (response) => {
        this.totalUsers = response.totalUsers;
      },
      (error) => {
        console.error('Error fetching user count:', error);
      }
    );
  }

  fetchUserRoles(): void {
    this.http.get<{ roleCounts: { [key: string]: number } }>(`${this.baseUrl}/roles`, { headers: this.getHeaders() }).subscribe(
      (response) => {
        const roleCounts = response.roleCounts;
        this.userRoles = Object.keys(roleCounts).map(role => ({ role, count: roleCounts[role] }));
      },
      (error) => {
        console.error('Error fetching role counts:', error);
      }
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
