// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private githubClientId = 'Ov23li9u4u8G1f38HTTR';
  private githubClientSecret = 'f1142c9bb36d3b09473a4d090ae4ece9bc0a3ad2';
  private githubRedirectUri = 'http://localhost:4200/redirect';

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {}

  loginWithGitHub() {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${this.githubClientId}&redirect_uri=${this.githubRedirectUri}`;
  }

  handleGitHubCallback(code: string) {
    const body = {
      client_id: this.githubClientId,
      client_secret: this.githubClientSecret,
      code: code,
      redirect_uri: this.githubRedirectUri
    };

    this.http.post('https://github.com/login/oauth/access_token', body, {
      headers: {
        Accept: 'application/json'
      }
    }).subscribe((response: any) => {
      const accessToken = response.access_token;
      localStorage.setItem('accessToken', accessToken);
      // Redirect or handle login success
    });
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');
    return !this.jwtHelper.isTokenExpired(token || '');
  }

  logout() {
    localStorage.removeItem('accessToken');
    // Redirect to login or home page
  }
}
