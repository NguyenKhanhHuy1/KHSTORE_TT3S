/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ConfigDeleteOrderDiaLog',
  templateUrl: './ConfigDeleteOrderDiaLog.component.html',
  styleUrls: ['./ConfigDeleteOrderDiaLog.component.css']
})
export class ConfigDeleteOrderDiaLogComponent implements OnInit {
  reason: string;
  submitted: boolean = false;

  listreason: any[] = [
    'Khách hàng muốn suy nghĩ thêm',
    'Khách hàng muốn thay đổi đơn hàng',
    'Khách hàng không muốn mua nữa',
    'Khách hàng đã mua ở nơi khác'
  ];

  constructor(public dialogRef: MatDialogRef<ConfigDeleteOrderDiaLogComponent>) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.submitted = true;
    if (!this.reason) {
      this.dialogRef.disableClose;
    } else {
      this.submitted = false;
      this.dialogRef.close(this.reason);
    }
  }
}
