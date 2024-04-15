import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([
    { user: 'changeme', email: 'changeme@gmail.com', role: 'Engenheiro de FE' },
    { user: 'changeme2', email: 'changeme2@gmail.com', role: 'Engenheiro de BE' },
    { user: 'changeme3', email: 'changeme3@gmail.com', role: 'Analista de dados' },
    { user: 'changeme4', email: 'changeme4@gmail.com', role: 'Lider Técnico' },
  ]);

  users$: Observable<any[]> = this.usersSubject.asObservable();

  constructor() { }

  updateUser(updatedUser: any): void {
    const users = this.usersSubject.getValue();
    const updatedUsers = users.map(user => user.user === updatedUser.user ? updatedUser : user);
    this.usersSubject.next(updatedUsers);
  }
}
