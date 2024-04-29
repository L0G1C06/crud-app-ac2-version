import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  totalUsers: number = 0;
  userRoles: { role: string; count: number }[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUserCount();
    this.fetchUserRoles();
  }

  fetchUserCount(): void {
    this.http.get<any>('http://0.0.0.0:8000/api/v1/users/count').subscribe(
      (response) => {
        this.totalUsers = response.data;
      },
      (error) => {
        console.error('Error fetching user count:', error);
      }
    );
  }

  fetchUserRoles(): void {
    this.http.get<any>('http://0.0.0.0:8000/api/v1/users/list').subscribe(
      (response) => {
        this.userRoles = response.data;
      },
      (error) => {
        console.error('Error fetching user roles:', error);
      }
    );
  }
}
