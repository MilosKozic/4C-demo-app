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

@StoreConfig({ name: 'users' })
@Injectable({ providedIn: 'root' })
export class UserStore extends Store<UserState> {
  constructor() {
    super({ users: [] });
  }

  updateUsers(users: User[]) {
    this.update((state) => ({ ...state, users }));
  }

  addUser(user: User) {
    this.update((state) => ({
      users: [...state.users, user],
    }));
  }
}
