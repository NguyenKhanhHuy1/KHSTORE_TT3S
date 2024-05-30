/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from '../../services/employee/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export default class EmployeesComponent implements OnInit {
  listEmployees: Employee[];
  originalEmployees: Employee[] = [];
  page: number;

  searchValue: string;
  rowCount: number;
  pageSize: number;

  constructor(private EmployeeService: EmployeeService) {}

  ngOnInit() {
    this.fetchEmployees();
    const savedSearchValue = localStorage.getItem('employee');
    if (savedSearchValue) {
      this.searchValue = savedSearchValue;
      this.search();
    }
  }

  fetchEmployees(): void {
    this.EmployeeService.getAll().subscribe({
      next: (data) => {
        this.listEmployees = data;
        this.rowCount = this.listEmployees.length;
        this.pageSize = Math.ceil(this.listEmployees.length / 6);
      },
      error: (e) => console.error(e)
    });
  }
  onSubmit() {
    if (this.searchValue) {
      localStorage.setItem('employee', this.searchValue);
      this.listEmployees = this.originalEmployees.filter((employee) =>
        employee.employeeName.toLowerCase().includes(this.searchValue.toLowerCase())
      );
      this.rowCount = this.listEmployees.length;
      this.pageSize = Math.ceil(this.listEmployees.length / 6);
    } else {
      localStorage.removeItem('employee');
      this.listEmployees = [...this.originalEmployees];
      this.rowCount = this.listEmployees.length;
      this.pageSize = Math.ceil(this.listEmployees.length / 6);
    }
  }
  search(): void {
    if (!this.searchValue.trim()) {
      localStorage.removeItem('employee');
      this.fetchEmployees();
    } else {
      localStorage.setItem('employee', this.searchValue);
      this.EmployeeService.search(this.searchValue).subscribe({
        next: (data) => {
          this.listEmployees = data;
          this.rowCount = this.listEmployees.length;
          this.pageSize = Math.ceil(this.listEmployees.length / 6);
        },
        error: (e) => console.error(e)
      });
    }
  }
}
