/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pipe, PipeTransform } from '@angular/core';
import { Order } from 'src/app/models/order';

@Pipe({
  name: 'filterbyDateAndCustomer'
})
export class FilterbyDateAndCustomerPipe implements PipeTransform {
  transform(items: any[], searchValue: string, range: any, status: any): { filteredOrders: any[]; totalItems: number; PageSize: number } {
    if (!items) {
      return { filteredOrders: items, totalItems: items.length, PageSize: Math.ceil(items.length / 10) };
    }

    // Lọc theo khoảng thời gian đặt hàng
    if (range && range.start && range.end) {
      const from = new Date(range.start);
      const to = new Date(range.end);
      items = items.filter((item) => {
        const orderTime = new Date(item.orderTime);
        return orderTime >= from && orderTime <= to;
      });
    }
    if (status) {
      items = items.filter((item) => {
        return item.status.toString() === status.toString();
      });
    }

    // Lọc theo tên khách hàng
    if (searchValue) {
      items = items.filter((item) => item.customerName.toLowerCase().includes(searchValue.toLowerCase()));
    }
    const pageSize = Math.ceil(items.length / 10);
    return { filteredOrders: items, totalItems: items.length, PageSize: pageSize };
  }
}
