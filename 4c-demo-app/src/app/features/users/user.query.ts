import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { User, UserStore } from './user.store';
import { UserState } from './user.store';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserQuery extends Query<UserState> {
  constructor( store: UserStore) {
    super(store);
  }

  // Select all users as an observable
  selectAll(): Observable<User[]> {
    return this.select(state => state.users);
  }
}
