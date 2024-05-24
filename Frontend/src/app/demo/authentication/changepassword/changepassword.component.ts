/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { UserSessionService } from 'src/app/services/UserSession/UserSession.service';
import { EmployeeService } from '../../../services/employee/employee.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  oldpassword: string = '';
  newpassword: string = '';
  newpassword2: string = '';

  UserData: Employee;

  submitted = false;
  message1: string = '';
  message2: string = '';
  message3: string = '';

  constructor(
    private location: Location,
    private usersessionService: UserSessionService,
    private employeeService: EmployeeService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.UserData = this.usersessionService.getSession();
  }
  changepassword(id: string) {
    this.submitted = true;
    this.message1 = '';
    this.message2 = '';
    this.message3 = '';
    console.log(this.UserData);
    if (this.validateInput()) {
      console.log('Có lỗi xảy ra trong quá trình xác nhận mật khẩu');
      return;
    }
    const data = {
      password: this.newpassword
    };
    console.log(data);
    this.employeeService.changepassword(id, data).subscribe({
      next: (res) => {
        console.log(res);
        this.openSnackBar('Đổi mật khẩu thàn công - vui lòng đăng nhập lại', 'Đóng');
        localStorage.removeItem('token');
        this.usersessionService.clearSession();
        this.router.navigate(['login']);
      },
      error: (e) => console.error(e)
    });
  }
  goBack() {
    this.location.back();
  }
  validateInput() {
    // Kiểm tra mật khẩu hiện tại
    if (!this.oldpassword) {
      this.message1 = '';
    } else if (this.oldpassword.length < 6) {
      this.message1 = 'Mật khẩu hiện tại phải có ít nhất 6 ký tự';
    } else if (this.oldpassword.trim() !== this.UserData.password.trim()) {
      this.message1 = 'Mật khẩu hiện tại không chính xác';
    } else {
      this.message1 = null;
    }
    // Kiểm tra mật khẩu mới
    if (!this.newpassword) {
      this.message2 = '';
    } else if (this.newpassword.length < 6) {
      this.message2 = 'Mật khẩu mới phải có ít nhất 6 ký tự';
    } else {
      this.message2 = null;
    }
    // Kiểm tra xác nhận mật khẩu
    if (!this.newpassword2) {
      this.message3 = '';
    } else if (this.newpassword.trim() !== this.newpassword2.trim() || this.newpassword2.length < 6) {
      this.message3 = 'Mật khẩu xác nhận không khớp';
    } else {
      this.message3 = null;
    }
    return this.message1 !== null || this.message2 !== null || this.message3 !== null;
  }
  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000 // Thời gian hiển thị
    });
  }
}
