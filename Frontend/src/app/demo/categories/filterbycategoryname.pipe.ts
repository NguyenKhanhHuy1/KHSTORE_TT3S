import { Pipe, PipeTransform } from '@angular/core';
import { Category } from 'src/app/models/category';

@Pipe({
  name: 'filterByCategoryName'
})
export class FilterByCategoryNamePipe implements PipeTransform {
  transform(categories: Category[], searchValue: string): Category[] {
    let listcategories;
    if (!categories || !searchValue) {
      listcategories = categories;
      return listcategories;
    }

    listcategories = categories.filter((category) => category.categoryName.toLowerCase().includes(searchValue.toLowerCase()));
    return listcategories;
  }
}
