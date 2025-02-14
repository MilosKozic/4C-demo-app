import { Query } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { UserStore, UserState } from './user.store';

@Injectable({ providedIn: 'root' })
export class UserQuery extends Query<UserState> {
  constructor(store: UserStore) {
    super(store);
  }

  // You can create selectors to get parts of the state
  get users$() {
    return this.select((state) => state.users);
  }
}
