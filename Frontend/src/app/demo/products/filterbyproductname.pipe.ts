/* eslint-disable @typescript-eslint/no-unused-vars */
import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/models/product';

@Pipe({
  name: 'filterbyProductName'
})
export class FilterByProductNamePipe implements PipeTransform {
  private submittedSearch: boolean = false;
  transform(
    products: Product[],
    searchValue: string,
    category: string,
    supplier: string
  ): { filteredProducts: Product[]; totalItems: number; PageSize: number } {
    if (this.submittedSearch) {
      if (!products || !products.length) {
        return { filteredProducts: products, totalItems: products.length, PageSize: Math.ceil(products.length / 10) };
      }

      if (category) {
        products = products.filter((product) => {
          return category.toString() == product.categoryId.toString();
        });
      }
      if (supplier) {
        products = products.filter((product) => {
          return supplier.toString() === product.supplierId.toString();
        });
      }
      if (searchValue) {
        products = products.filter((product) => product.productName.toLowerCase().includes(searchValue.toLowerCase()));
      }
      const pageSize = Math.ceil(products.length / 10);
      this.submittedSearch = false;
      return { filteredProducts: products, totalItems: products.length, PageSize: pageSize };
    } else {
      // Trả về giá trị mặc định khi submitted là false hoặc không có sản phẩm
      return { filteredProducts: products, totalItems: products.length, PageSize: Math.ceil(products.length / 10) };
    }
  }
  submitSearch() {
    this.submittedSearch = true;
  }
}
