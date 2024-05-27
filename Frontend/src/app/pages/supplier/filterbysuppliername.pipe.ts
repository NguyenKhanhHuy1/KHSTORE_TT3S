import { Pipe, PipeTransform } from '@angular/core';
import { Supplier } from 'src/app/models/supplier';

@Pipe({
  name: 'filterbysuppliername'
})
export class FilterbysuppliernamePipe implements PipeTransform {
  transform(suppliers: Supplier[], searchValue: string): Supplier[] {
    if (!suppliers || !searchValue) {
      return suppliers;
    }

    return suppliers.filter((supplier) => supplier.supplierName.toLowerCase().includes(searchValue.toLowerCase()));
  }
}
