/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SEARCH_EMPLOYEE_URL, CHANGEPASSWORD_URL, LOGIN_URL, EMPLOYEE_URL, EMPLOYEE_BY_ID_URL } from 'src/app/pages/constants/urls';
import { Employee } from 'src/app/models/employee';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {}

  getAll(): Observable<Employee[]> {
    const EmployeessList = this.http.get<Employee[]>(EMPLOYEE_URL);
    console.log(EmployeessList);
    return EmployeessList;
  }
  search(searchValue): Observable<Employee[]> {
    const EmployeessList = this.http.get<Employee[]>(`${SEARCH_EMPLOYEE_URL}${searchValue}`);
    console.log(EmployeessList);
    return EmployeessList;
  }
  get(id: any): Observable<Employee> {
    return this.http.get<Employee>(`${EMPLOYEE_BY_ID_URL}${id}`);
  }
  create(data: any): Observable<any> {
    console.log(data);
    return this.http.post(EMPLOYEE_URL, data);
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${EMPLOYEE_BY_ID_URL}${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${EMPLOYEE_BY_ID_URL}${id}`);
  }

  login(data: any): Observable<any> {
    const employee = this.http.post(LOGIN_URL, data);
    return employee;
  }

  getEmployeeIdFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.employeeId;
    }
    return null;
  }
  changepassword(id: any, data: any): Observable<any> {
    return this.http.put(`${CHANGEPASSWORD_URL}${id}`, data);
  }
}
