import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { CreateEditUserComponent } from './create-edit-user/create-edit-user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    UsersListComponent,
    CreateEditUserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    MatButtonModule
  ]
})
export class UsersModule { }
