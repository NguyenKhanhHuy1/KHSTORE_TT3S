/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @angular-eslint/component-selector */
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee/employee.service';

import { MatDialog } from '@angular/material/dialog';
import { ConfigDeleteDiaLogComponent } from '../../ConfigDeleteDiaLog/ConfigDeleteDiaLog.component';

@Component({
  selector: 'app-deleteEmployee',
  templateUrl: './deleteEmployee.component.html',
  styleUrls: ['./deleteEmployee.component.css']
})
export class DeleteEmployeeComponent implements OnInit {
  employee: Employee = {
    employeeName: '',
    address: '',
    birthDate: new Date(),
    email: '',
    password: '',
    photo: '',
    provinceId: '',
    phone: '',
    role: '',
    isworking: true
  };
  constructor(
    private location: Location,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getEmployee(this.route.snapshot.params['id']);
  }
  getEmployee(id: any): void {
    this.employeeService.get(id).subscribe({
      next: (data) => {
        this.employee = data;
        console.log(this.employee);
      },
      error: (e) => console.error(e)
    });
  }
  deleteEmployee(id: any) {
    this.employeeService.delete(id).subscribe({
      next: (res) => {
        this.location.back();
      },
      error: (e) => console.error(e)
    });
  }
  openConfirmDeleteDialog(): void {
    const dialogRef = this.dialog.open(ConfigDeleteDiaLogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteEmployee(this.employee._id);
      }
    });
  }
  goBack(): void {
    this.location.back();
  }
}
