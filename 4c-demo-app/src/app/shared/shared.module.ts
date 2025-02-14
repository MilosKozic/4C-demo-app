import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [TableComponent, NavbarComponent, SidebarComponent],
  imports: [CommonModule],
  exports: [TableComponent, NavbarComponent, SidebarComponent],
})
export class SharedModule {}
