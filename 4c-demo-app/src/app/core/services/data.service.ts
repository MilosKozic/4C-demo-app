import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User, UserStore } from 'src/app/features/users/user.store';
import { UserQuery } from 'src/app/features/users/user.query';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private userStore: UserStore, private userQuery: UserQuery) {}

  // Get users using Akita store
  getUsers(): Observable<User[]> {
    const users = this.userQuery.getValue().users;
    if (users.length === 0) {
      const mockUsers: User[] = [
        { id: 1, name: 'John Doe', active: true },
        { id: 2, name: 'Jane Smith', active: false },
        { id: 3, name: 'Alice Johnson', active: true },
      ];
      this.userStore.updateUsers(mockUsers);
      return of(mockUsers).pipe(delay(1000));
    }
    return of(users);
  }

  addUser(user: User): Observable<User> {
    this.userStore.addUser(user); 
    return of(user).pipe(delay(500)); 
  }
}
