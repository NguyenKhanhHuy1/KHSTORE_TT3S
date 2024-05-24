/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// angular import
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserSessionService } from 'src/app/services/UserSession/UserSession.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent {
  message: any;
  submitted: boolean = false;
  email: string = '';
  password: string = '';

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private userService: UserSessionService
  ) {}

  login() {
    this.submitted = true;
    const data = {
      email: this.email,
      password: this.password
    };
    this.employeeService.login(data).subscribe(
      (response) => {
        console.log('Login successful:', response);
        localStorage.setItem('token', response.token);
        const decodedToken = this.decodeToken(response.token);
        this.userService.setSession(decodedToken);
        console.log(decodedToken);
        this.router.navigate(['/Orders/List']);
      },
      (error) => {
        if (this.email && this.password) {
          this.message = 'Tên tài khoản hoặc mật khẩu không chính xác';
          console.error('Login error:', error);
        }
      }
    );
  }
  decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}
