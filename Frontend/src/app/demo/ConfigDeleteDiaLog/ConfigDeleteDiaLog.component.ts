/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-ConfigDeleteDiaLog',
  templateUrl: './ConfigDeleteDiaLog.component.html',
  styleUrls: ['./ConfigDeleteDiaLog.component.css']
})
export class ConfigDeleteDiaLogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ConfigDeleteDiaLogComponent>) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
