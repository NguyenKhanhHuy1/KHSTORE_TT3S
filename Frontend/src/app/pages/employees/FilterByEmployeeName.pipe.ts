import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from 'src/app/models/employee';

@Pipe({
  name: 'FilterByEmployeeName'
})
export class FilterByEmployeeNamePipe implements PipeTransform {
  transform(employees: Employee[], searchValue: string): { filtereEmployees: Employee[]; totalItems: number; PageSize: number } {
    if (!employees || !searchValue) {
      return { filtereEmployees: employees, totalItems: employees.length, PageSize: Math.ceil(employees.length / 9) };
    }

    const ListEmployee = employees.filter((employee) => employee.employeeName.toLowerCase().includes(searchValue.toLowerCase()));
    const pageSize = Math.ceil(ListEmployee.length / 10);
    return { filtereEmployees: ListEmployee, totalItems: ListEmployee.length, PageSize: pageSize };
  }
}
