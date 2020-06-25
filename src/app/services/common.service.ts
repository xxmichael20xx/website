import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  public openSnackBar(title: string) {
    this._snackBar.open(title, "close", {
      duration: 3000
    });
  }
}
