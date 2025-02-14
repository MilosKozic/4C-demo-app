import { Component, OnInit } from '@angular/core';
import { User } from '../user.store';
import { Observable } from 'rxjs';
import { UserQuery } from '../user.query';
import { DataService } from 'src/app/core/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { UserModalComponent } from 'src/app/shared/components/user-modal/user-modal.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users$: Observable<User[]>; 
  newUserName: string = '';
  newUserActive: boolean = true;

  headersData = [
    { columnDef: 'id', header: 'ID' },
    { columnDef: 'name', header: 'Name' },
    { columnDef: 'active', header: 'Active' }
  ];

  constructor(private dataService: DataService, private userQuery: UserQuery, private dialog: MatDialog) {
    this.users$ = this.userQuery.selectAll();  // Get the users from the store
  }

  ngOnInit(): void {
    this.dataService.getUsers().subscribe();
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(UserModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('User added:', result);
        // Handle user data (e.g., add it to your list of users)
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
}
