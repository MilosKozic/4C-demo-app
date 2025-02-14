import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = [];
  private _headersData: any;

  get headersData(): any[] | null {
    return this._headersData;
  }
  @Input() set headersData(value: any[] | null) {
    this._headersData = value;
    this.displayedColumns = [];
    this.headersData?.forEach((header: any) => {
      if (!header.hidden) this.displayedColumns.push(header.columnDef);
    });
  }

  dataSource!: MatTableDataSource<any>;
  tableDataSource!: any[];

  @Input() set tableData(value: any[] | null) {
    console.log({ value });
    this.tableDataSource = value || [];
    this.dataSource = new MatTableDataSource<any>(value ? value : []);
    this._tableData = value;
  }

  get tableData() {
    return this._tableData;
  }

  private _tableData!: any[] | null;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  ngOnInit() {}
}
