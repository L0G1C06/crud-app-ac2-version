import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
 export class AuthGuardService {

 constructor(
 private cookieService: CookieService,
 public router: Router,
 ) { }

 canActivate(): boolean {
 if (this.cookieService.get('authToken')) {
   return true
 } else {
   this.router.navigate(['/login']);
   return false
   }
 }

 }

export const authGuardGuard: CanActivateFn = (route, state) => {
  return inject(AuthGuardService).canActivate();
};