import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/element/confirm-dialog/confirm-dialog.component';
import { ProjectService } from 'src/app/services/project.service';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public links: any[] = [
    { link: "info", label: "Home", icon: "home" },
    { link: "projects", label: "Projects", icon: "location_city" },
    { link: "logs", label: "Logs", icon: "list" },
    { link: "cms", label: "CMS", icon: "settings" }
  ];

  constructor(
    private router: Router,
    private common: CommonService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    
  }

  logout() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: "Are you sure?",
        content: "You will be logged out!"
      },
      width: "20%",
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        sessionStorage.removeItem("isLogged_in");
        sessionStorage.removeItem("email");

        this.router.navigateByUrl('/info');
      }
    })
  }

}
