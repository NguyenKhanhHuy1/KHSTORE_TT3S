/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/models/employee';

import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-profileEmployee',
  templateUrl: './profileEmployee.component.html',
  styleUrls: ['./profileEmployee.component.css']
})
export class ProfileEmployeeComponent implements OnInit {
  employee: Employee;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.getEmployee(this.route.snapshot.params['id']);
  }
  getEmployee(id: string): void {
    this.employeeService.get(id).subscribe({
      next: (data) => {
        this.employee = data;
        console.log(this.employee);
      },
      error: (e) => console.error(e)
    });
  }
  goBack(): void {
    this.location.back();
  }
}
