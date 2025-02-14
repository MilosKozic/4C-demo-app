import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../user.store';
import { combineLatest, map, Observable, Subject, takeUntil } from 'rxjs';
import { UserQuery } from '../user.query';
import { DataService } from 'src/app/core/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { UserModalComponent } from 'src/app/shared/components/user-modal/user-modal.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>();

  users$: Observable<User[]>;
  isAddUserButtonEnabled$: Observable<boolean>;
  newUserName: string = '';
  newUserActive: boolean = true;

  headersData = [
    { columnDef: 'id', header: 'ID' },
    { columnDef: 'name', header: 'Name' },
    { columnDef: 'active', header: 'Active' },
  ];

  constructor(
    private dataService: DataService,
    private userQuery: UserQuery,
    private dialog: MatDialog
  ) {
    this.users$ = this.userQuery.selectAll();

    this.isAddUserButtonEnabled$ = combineLatest([
      this.users$,
      this.users$.pipe(map(users => users.length))
    ]).pipe(
      map(([users, userCount]) => {
        const allActive = users.every(user => user.active);
        return allActive && userCount < 5;
      })
    );
  }

  ngOnInit(): void {
    this.dataService.getUsers().pipe(takeUntil(this.unsubscribe$)).subscribe();
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(UserModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('User added:', result); 
      }
    });
  }

  addUser(): void {
    if (this.newUserName.trim() === '') {
      return;
    }

    const newUser: User = {
      id: 0,
      name: this.newUserName,
      active: this.newUserActive,
    };

    this.dataService.addUser(newUser).subscribe(() => {
      this.newUserName = '';
      this.newUserActive = true;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
