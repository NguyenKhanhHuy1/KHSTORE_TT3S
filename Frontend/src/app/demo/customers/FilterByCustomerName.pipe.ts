import { Pipe, PipeTransform } from '@angular/core';
import { Customer } from 'src/app/models/customer';

@Pipe({
  name: 'FilterByCustomerName'
})
export class FilterByCustomerNamePipe implements PipeTransform {
  transform(customers: Customer[], searchValue: string): Customer[] {
    if (!customers || !searchValue) {
      return customers;
    }

    return customers.filter((customer) => customer.customerName.toLowerCase().includes(searchValue.toLowerCase()));
  }
}
