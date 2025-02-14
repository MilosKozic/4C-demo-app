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
    // If there are no users in the store, fetch and add mock users
    const users = this.userQuery.getValue().users;
    if (users.length === 0) {
      const mockUsers: User[] = [
        { id: 1, name: 'John Doe', active: true },
        { id: 2, name: 'Jane Smith', active: false },
        { id: 3, name: 'Alice Johnson', active: true },
      ];
      this.userStore.update({ users: mockUsers });  // Use update to set the users in the store
    }
    return of(this.userQuery.getValue().users).pipe(delay(1000));  // Return the users from the store
  }

  // Add user to the store
  addUser(user: User): Observable<User> {
    const currentUsers = this.userQuery.getValue().users;
    const updatedUser = { ...user, id: currentUsers.length + 1 }; // Assign an ID, based on length of current users
    this.userStore.update({ users: [...currentUsers, updatedUser] }); // Add new user to the store
    return of(updatedUser).pipe(delay(500));  // Simulate server delay
  }
}
