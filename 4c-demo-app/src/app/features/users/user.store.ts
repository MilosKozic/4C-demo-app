import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
export interface User {
  id: number;
  name: string;
  active: boolean;
}

export interface UserState {
  users: User[];
}

export function createInitialState(): UserState {
  return {
    users: [],
  };
}

@StoreConfig({ name: 'users' })
@Injectable({ providedIn: 'root' })
export class UserStore extends Store<UserState> {
  constructor() {
    super(createInitialState());
  }

  // Optionally, add methods to update the store
  addUser(user: User) {
    const currentState = this.getValue();
    this.update({
      users: [...currentState.users, user],  // Add new user to the existing users list
    });
  }
}
