import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { CreateEditUserComponent } from './create-edit-user/create-edit-user.component';

const routes: Routes = [
  { path: '', component: UsersListComponent },
  { path: 'create', component: CreateEditUserComponent },
  { path: 'edit/:id', component: CreateEditUserComponent }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
