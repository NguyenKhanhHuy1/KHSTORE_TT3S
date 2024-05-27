/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// angular import
import { Component, OnInit } from '@angular/core';

// project import
// project import
import { OrderService } from '../../../services/order/order.service';
import { Order } from 'src/app/models/order';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { FormControl, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-orderslist',
  templateUrl: './orderslist.component.html',
  styleUrls: ['./orderslist.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export default class OrderlistComponent implements OnInit {
  orders: Order[];
  originalorders: Order[] = [];
  searchValue: string;
  page: number;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  status: string = '';
  rowCount: number;
  pageSize: number;

  // constructor
  constructor(
    private orderService: OrderService,
    private employeeService: EmployeeService,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale('en-GB');
  }
  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.orderService.getAll().subscribe({
      next: (data) => {
        this.orders = data;
        this.rowCount = this.orders.length;
        this.pageSize = Math.ceil(this.orders.length / 10);
        this.originalorders = [...this.orders];
      },
      error: (e) => console.error(e)
    });
  }
  getEmployeeName(id: string): any {
    return this.employeeService.get(id);
  }
  getDater(data) {
    console.log(data);
  }
  onSubmit() {
    console.log(this.range);
    if (!this.searchValue && !this.status && !this.range.value.start && !this.range.value.end) {
      this.orders = [...this.originalorders];
      this.rowCount = this.orders.length;
      this.pageSize = Math.ceil(this.orders.length / 10);
    } else {
      if (this.searchValue && this.status && this.range.value) {
        let from = new Date(this.range.get('start').value);
        let to = new Date(this.range.get('end').value);
        if (this.range.value.start == null) {
          from = new Date('01/01/1970');
        }
        if (this.range.value.end == null) {
          to = new Date();
        }
        this.orders = this.originalorders.filter((order) => {
          const orderTime = new Date(order.orderTime);
          return (
            this.status.toString() === order.status.toString() &&
            order.customerName.toLowerCase().includes(this.searchValue.toLowerCase()) &&
            orderTime >= from &&
            orderTime <= to
          );
        });
      }
      if (this.searchValue && this.status && !this.range) {
        this.orders = this.originalorders.filter((order) => {
          return (
            this.status.toString() === order.status.toString() && order.customerName.toLowerCase().includes(this.searchValue.toLowerCase())
          );
        });
      }
      if (this.searchValue && !this.status && this.range) {
        let from = new Date(this.range.get('start').value);
        let to = new Date(this.range.get('end').value);
        if (this.range.value.start == null) {
          from = new Date('01/01/1970');
        }
        if (this.range.value.end == null) {
          to = new Date();
        }
        this.orders = this.originalorders.filter((order) => {
          const orderTime = new Date(order.orderTime);
          return order.customerName.toLowerCase().includes(this.searchValue.toLowerCase()) && orderTime >= from && orderTime <= to;
        });
      }
      if (this.searchValue && !this.status && !this.range) {
        this.orders = this.originalorders.filter((order) => {
          return order.customerName.toLowerCase().includes(this.searchValue.toLowerCase());
        });
      }
      if (!this.searchValue && this.status && this.range) {
        let from = new Date(this.range.get('start').value);
        let to = new Date(this.range.get('end').value);
        if (this.range.value.start == null) {
          from = new Date('01/01/1970');
        }
        if (this.range.value.end == null) {
          to = new Date();
        }
        this.orders = this.originalorders.filter((order) => {
          const orderTime = new Date(order.orderTime);
          return this.status.toString() === order.status.toString() && orderTime >= from && orderTime <= to;
        });
      }
      if (!this.searchValue && this.status && !this.range) {
        this.orders = this.originalorders.filter((order) => {
          return this.status.toString() === order.status.toString();
        });
      }
      if (!this.searchValue && !this.status && this.range) {
        let from = new Date(this.range.get('start').value);
        let to = new Date(this.range.get('end').value);
        if (this.range.value.start == null) {
          from = new Date('01/01/1970');
        }
        if (this.range.value.end == null) {
          to = new Date();
        }
        this.orders = this.originalorders.filter((order) => {
          const orderTime = new Date(order.orderTime);
          return orderTime >= from && orderTime <= to;
        });
      }
      this.rowCount = this.orders.length;
      this.pageSize = Math.ceil(this.orders.length / 10);
    }
  }
  search(): void {
    if (!this.searchValue && !this.status && !this.range.value.start && !this.range.value.end) {
      this.fetchOrders();
    } else {
      let rangeStartStr = null;
      let rangeEndStr = null;
      if (this.range.value.start) {
        rangeStartStr = String(this.range.value.start);
      }
      if (this.range.value.end) {
        rangeEndStr = String(this.range.value.end);
      }
      console.log(null);
      console.log(rangeEndStr);
      this.orderService.search(this.searchValue, this.status, rangeStartStr, rangeEndStr).subscribe({
        next: (data) => {
          this.orders = data;
          this.rowCount = this.orders.length;
          this.pageSize = Math.ceil(this.orders.length / 10);
        },
        error: (e) => console.error(e)
      });
    }
  }
}
