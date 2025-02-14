import { Injectable } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
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
        { id: uuidv4(), name: 'John Doe', active: true },
        { id: uuidv4(), name: 'Jane Smith', active: false },
        { id: uuidv4(), name: 'Alice Johnson', active: true },
      ];
      this.userStore.update({ users: mockUsers });
    }
    return of(this.userQuery.getValue().users).pipe(delay(1000));
  }

  // Add user to the store
  addUser(user: User): Observable<User> {
    const currentUsers = this.userQuery.getValue().users;
    const updatedUser = { ...user, id: uuidv4() };
    this.userStore.update({ users: [...currentUsers, updatedUser] });
    return of(updatedUser).pipe(delay(500));
  }

  // Simulate a backend call for checking if the username is unique
  isNameUnique(name: string): Observable<boolean> {
    return timer(500).pipe( // Simulate backend delay
      switchMap(() => {
        const users = this.userQuery.getValue().users;
        const isUnique = !users.some(user => user.name.toLowerCase() === name.toLowerCase()); // Check if name is unique (case-insensitive)
        return of(isUnique);
      })
    );
  }
}
