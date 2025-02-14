import { Component, OnInit } from '@angular/core';
import { User } from '../user.store';
import { Observable } from 'rxjs';
import { UserQuery } from '../user.query';
import { DataService } from 'src/app/core/services/data.service';

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

  constructor(private dataService: DataService, private userQuery: UserQuery) {
    this.users$ = this.userQuery.users$; 
  }

  ngOnInit(): void {
    this.dataService.getUsers().subscribe();
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
