import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface dialogData {
  title: string,
  content: string
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  public title: string;
  public content: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: dialogData,
    private dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) {
    this.title = this.dialogData.title;
    this.content = this.dialogData.content;
  }

  ngOnInit(): void {
  }

  cancel() {
    this.dialogRef.close();
  }

  confirm() {
    this.dialogRef.close(true);
  }

}
