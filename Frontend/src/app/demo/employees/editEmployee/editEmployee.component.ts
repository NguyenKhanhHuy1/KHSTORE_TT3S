/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { ProvinceService } from '../../../services/province/province.service';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editEmployee',
  templateUrl: './editEmployee.component.html',
  styleUrls: ['./editEmployee.component.css'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class EditEmployeeComponent implements OnInit {
  employee: Employee = {
    employeeName: '',
    address: '',
    birthDate: null,
    email: '',
    password: '',
    photo: '',
    provinceId: '',
    phone: '',
    role: '',
    isworking: true
  };
  submitted: boolean = false;
  listprovinces: any;
  file: any;
  preview: any;

  date = new FormControl();

  message: string;
  constructor(
    private location: Location,
    private provinceService: ProvinceService,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private dateAdapter: DateAdapter<Date>,
    private snackBar: MatSnackBar
  ) {
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit() {
    this.getEmployee(this.route.snapshot.params['id']);
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
  getEmployee(id: any): void {
    this.employeeService.get(id).subscribe({
      next: (data) => {
        this.employee = data;
        if (this.employee) {
          const birthDate = new Date(this.employee.birthDate);
          this.date.setValue(birthDate);
        }
        console.log(this.employee);
        console.log(this.date);
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
  saveEmployee(id: any) {
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
          password: this.employee.password,
          photo: base64Data,
          provinceId: this.employee.provinceId,
          phone: this.employee.phone,
          role: this.employee.role,
          isworking: this.employee.isworking
        };

        this.employeeService.update(id, data).subscribe({
          next: (res) => {
            console.log(res);
            this.openSnackBar('Đã cập nhật thông tin nhân viên', 'Đóng');
            this.location.back();
          },
          error: (e) => {
            if (e.status === 409) {
              this.message = 'Địa chỉ gmail đã tồn tại';
            } else {
              console.error(e);
              this.openSnackBar('Xẩy ra lỗi, vui lòng thử lại', 'Đóng');
            }
          }
        });
      };
    } else {
      const data = {
        employeeName: this.employee.employeeName,
        address: this.employee.address,
        birthDate: new Date(this.date.value),
        email: this.employee.email,
        password: this.employee.password,
        photo: this.employee.photo,
        provinceId: this.employee.provinceId,
        phone: this.employee.phone,
        role: this.employee.role,
        isworking: this.employee.isworking
      };
      console.log(data);
      this.employeeService.update(id, data).subscribe({
        next: (res) => {
          console.log(res);
          this.openSnackBar('Đã cập nhật thông tin nhân viên', 'Đóng');
          this.location.back();
        },
        error: (e) => {
          if (e.status === 409) {
            this.message = 'Địa chỉ gmail đã tồn tại';
          } else {
            console.error(e);
            this.openSnackBar('Xẩy ra lỗi, vui lòng thử lại', 'Đóng');
          }
        }
      });
    }
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
  goBack(): void {
    this.location.back();
  }
  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000 // Thời gian hiển thị
    });
  }
}
