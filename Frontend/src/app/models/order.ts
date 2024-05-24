import { Employee } from './employee';

/* eslint-disable @typescript-eslint/no-explicit-any */
export class Order {
  _id?: string;
  customerName: string;
  customerPhone: string;
  employeeId: string;
  orderTime: Date;
  endTime: Date;
  status: string;
  OrderDetails: any[];
  OrderDetailIds: any[];
  Employee: Employee[];
  employeeName?: string;
  reason?: string;
  sumprice: number;
  discount?: number;
  finalprice: number;
}
