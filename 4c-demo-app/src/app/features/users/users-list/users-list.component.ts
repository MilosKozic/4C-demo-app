import { Component } from '@angular/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  headersData = [
    { columnDef: 'id', header: 'ID', key: 'id', hidden: false },
    { columnDef: 'name', header: 'Name', key: 'name', hidden: false },
    { columnDef: 'active', header: 'Active', key: 'active', hidden: false }
  ];

  tableData = [
    { id: 1, name: 'John Doe', active: true },
    { id: 2, name: 'Jane Smith', active: false },
    { id: 3, name: 'Samuel Jackson', active: true },
    { id: 4, name: 'Michael Johnson', active: false },
    { id: 5, name: 'Emily Davis', active: true }
  ];
}
