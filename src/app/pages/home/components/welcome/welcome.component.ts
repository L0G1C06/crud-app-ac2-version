import { Component, OnInit } from '@angular/core';
import { WelcomeService } from './welcome.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  totalUsers: number = 0;
  userRoles: { role: string; count: number; }[] = [];

  constructor(private welcomeService: WelcomeService) {}

  ngOnInit(): void {
    this.fetchUserCount();
    this.fetchUserRoles();
  }

  fetchUserCount(): void {
    this.welcomeService.getUserCount().subscribe(
      (response) => {
        this.totalUsers = response.totalUsers;
      },
      (error) => {
        console.error('Error fetching user count:', error);
      }
    );
  }

  fetchUserRoles(): void {
    this.welcomeService.getUserRoles().subscribe(
      (response) => {
        const roleCounts = response.roleCounts;
        this.userRoles = Object.keys(roleCounts).map(role => ({ role, count: roleCounts[role] }));
      },
      (error) => {
        console.error('Error fetching role counts:', error);
      }
    );
  }
}
