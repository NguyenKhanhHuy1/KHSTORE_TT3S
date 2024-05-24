/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from '../../../services/employee/employee.service';
import { ProvinceService } from '../../../services/province/province.service';
import { FormControl } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-createEmployee',
  templateUrl: './createEmployee.component.html',
  styleUrls: ['./createEmployee.component.css'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class CreateEmployeeComponent implements OnInit {
  employee: Employee = {
    employeeName: '',
    address: '',
    birthDate: new Date(),
    email: '',
    password: '123456',
    photo: '',
    provinceId: '',
    phone: '',
    role: '',
    Province: [],
    isworking: true
  };
  date = new FormControl();

  submitted = false;
  listprovinces: any;
  file: any;
  preview: any;
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private EmployeeService: EmployeeService,
    private provinceService: ProvinceService,
    private dateAdapter: DateAdapter<Date>,
    private snackBar: MatSnackBar
  ) {
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit() {
    this.fetchProvince();
  }
  fetchProvince(): void {
    this.provinceService.getAll().subscribe({
      next: (data) => {
        this.listprovinces = data;
        console.log(this.listprovinces);
      },
      error: (e) => console.error(e)
    });
  }
  selectFile(event: any) {
    this.file = event.target.files[0];
    console.log(this.file);
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = (e: any) => {
      this.preview = e.target.result;
    };
  }
  saveEmployee() {
    this.submitted = true;
    if (!this.validateEmail()) {
      return;
    }
    if (!this.validateEmployeeName()) {
      return;
    }
    if (!this.validateEmployeePhone()) {
      return;
    }
    if (!this.employee.provinceId) {
      return;
    }
    if (this.file) {
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        const base64Data = reader.result?.toString();
        const data = {
          employeeName: this.employee.employeeName,
          address: this.employee.address,
          birthDate: new Date(this.date.value),
          email: this.employee.email,
          password: '123456',
          provinceId: this.employee.provinceId,
          role: this.employee.role,
          photo: base64Data,
          phone: this.employee.phone,
          isworking: this.employee.isworking
        };
        console.log(data);
        this.EmployeeService.create(data).subscribe(
          (response) => {
            if (response) {
              this.openSnackBar('Đã thêm nhân viên mới', 'Đóng');
              this.location.back();
            }
          },
          (error) => {
            if (error.status === 409) {
              this.openSnackBar('Địa chỉ email đã tồn tại', 'Đóng');
            } else {
              console.error(error);
              this.openSnackBar('Xảy ra lỗi', 'Đóng');
            }
          }
        );
      };
    } else {
      const data = {
        employeeName: this.employee.employeeName,
        address: this.employee.address,
        birthDate: new Date(this.date.value),
        email: this.employee.email,
        password: '123456',
        provinceId: this.employee.provinceId,
        role: this.employee.role,
        photo: this.employee.photo,
        phone: this.employee.phone,
        isworking: this.employee.isworking
      };
      console.log(data);
      this.EmployeeService.create(data).subscribe(
        (response) => {
          if (response) {
            this.openSnackBar('Đã thêm nhân viên mới', 'Đóng');
            this.location.back();
          }
        },
        (error) => {
          if (error.status === 409) {
            this.openSnackBar('Địa chỉ email đã tồn tại', 'Đóng');
          } else {
            console.error(error);
            this.openSnackBar('Xảy ra lỗi', 'Đóng');
          }
        }
      );
    }
  }
  goBack(): void {
    this.location.back();
  }
  validateEmployeePhone(): boolean {
    if (this.employee.phone.length !== 10) {
      return false;
    }
    const regex = /^\d+$/;
    return regex.test(this.employee.phone.toString());
  }
  validateEmployeeName(): boolean {
    const regex = /^[\p{L}\s']+$/u;
    return regex.test(this.employee.employeeName.toString());
  }
  validateEmail(): boolean {
    const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return emailRegex.test(this.employee.email);
  }
  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000 // Thời gian hiển thị
    });
  }
}
