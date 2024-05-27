/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'FilterByReason'
})
export class FilterByReasonPipe implements PipeTransform {
  transform(listreason: any[], searchValue: string): any[] {
    if (!listreason || !searchValue) {
      return listreason;
    }

    return listreason.filter((reason) => reason.toLowerCase().includes(searchValue.toLowerCase()));
  }
}
