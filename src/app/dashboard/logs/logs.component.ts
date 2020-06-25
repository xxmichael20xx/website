import { Component, OnInit, ViewChild } from '@angular/core';
import { LogService } from 'src/app/services/log.service';
import { log } from 'src/app/service-interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  public logs: log[] = [];
  public displayedColumns: string[] = ["id", "ip", "browser", "created_at"];
  public dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private logService: LogService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.logs = [];
    this.logService.getLogs().subscribe(data => {
      if (data.length > 0) {
        this.logs = data;
        this.dataSource = new MatTableDataSource(this.logs);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
