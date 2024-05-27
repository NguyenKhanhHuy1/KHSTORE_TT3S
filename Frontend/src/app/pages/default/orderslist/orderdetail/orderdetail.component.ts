/* eslint-disable no-empty */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { OrderService } from 'src/app/services/order/order.service';
import { OrderdetailService } from '../../../../services/orderdetail/orderdetail.service';

import { ConfigDeleteOrderDiaLogComponent } from '../ConfigDeleteOrderDiaLog/ConfigDeleteOrderDiaLog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import pdfMake from 'pdfmake/build/pdfMake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.css']
})
export class OrderdetailComponent implements OnInit {
  order: Order;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private location: Location,
    private orderdetailService: OrderdetailService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.getDetailOrder(this.route.snapshot.params['id']);
  }

  getDetailOrder(id: any): void {
    this.orderService.get(id).subscribe({
      next: (data) => {
        this.order = data;
        console.log(data);
        console.log(this.order);
      },
      error: (e) => console.error(e)
    });
  }
  getDetailOrderCart(id: any): void {
    this.orderdetailService.get(id).subscribe({
      next: (data) => {
        this.order = data;
        console.log(data);
        console.log(this.order);
      },
      error: (e) => console.error(e)
    });
  }
  goBack() {
    this.location.back();
  }

  sumofPrice(): number {
    return this.order.OrderDetails.reduce((total, item) => total + item.price * item.quantity, 0);
  }
  UpdateOrder(id: any): void {
    const data: any = {
      customerName: this.order.customerName,
      customerPhone: this.order.customerPhone,
      employeeId: this.order.employeeId,
      orderTime: this.order.orderTime,
      endTime: new Date(),
      status: 'Đã thanh toán',
      OrderDetailIds: this.order.OrderDetailIds,
      sumprice: this.order.sumprice,
      discount: this.order.discount,
      finalprice: this.order.finalprice
    };
    this.orderService.update(id, data).subscribe({
      next: (res) => {
        console.log(res);
        this.openSnackBar('Đã thanh toán đơn hàng', 'Đóng');
        this.reloadComponent(id);
      },
      error: (e) => console.error(e)
    });
  }
  DeleteOrder(id: any, reason: string): void {
    const data: any = {
      customerName: this.order.customerName,
      customerPhone: this.order.customerPhone,
      employeeId: this.order.employeeId,
      orderTime: this.order.orderTime,
      endTime: new Date(),
      status: 'Đã hủy',
      OrderDetailIds: this.order.OrderDetailIds,
      reason: reason,
      sumprice: this.order.sumprice,
      discount: this.order.discount,
      finalprice: this.order.finalprice
    };
    this.orderService.update(id, data).subscribe({
      next: (res) => {
        console.log(res);
        this.openSnackBar('Đã hủy đơn hàng', 'Đóng');
        this.reloadComponent(id);
      },
      error: (e) => console.error(e)
    });
  }

  openConfirmDeleteOrderDialog(id: any): void {
    const dialogRef = this.dialog.open(ConfigDeleteOrderDiaLogComponent);
    dialogRef.afterClosed().subscribe((reason) => {
      if (reason) {
        this.DeleteOrder(id, reason);
      } else {
        dialogRef.disableClose = true;
      }
    });
  }
  PrintfPay() {
    let orderDate = new Date(this.order.orderTime);
    let formattedDate = `${orderDate.getDate().toString().padStart(2, '0')}/${(orderDate.getMonth() + 1).toString().padStart(2, '0')}/${orderDate.getFullYear()}`;
    let endTimeDate = new Date();

    let hours = endTimeDate.getHours();
    let minutes = endTimeDate.getMinutes();
    // Định dạng lại thành chuỗi
    let formattedEndTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    let docDefinition = {
      content: [
        {
          text: 'KH STORE',
          bold: true,
          fontSize: 18,
          alignment: 'center',
          color: '#047886'
        },
        {
          text: 'ĐC: 6/12 Nguyễn Duy Cung, Thủy Phương, Hương Thủy, Thừa Thiên Huế',
          fontSize: 12,
          alignment: 'center'
        },
        {
          text: 'SĐT: 0363536307 - 0982534367',
          fontSize: 12,
          alignment: 'center'
        },
        {
          text: '***',
          fontSize: 12,
          alignment: 'center'
        },
        {
          canvas: [{ type: 'line', x1: 0, y1: 5, x2: 520, y2: 5, lineWidth: 0.5, alignment: 'center' }]
        },
        {
          text: ' '
        },
        {
          text: 'HÓA ĐƠN BÁN HÀNG ',
          bold: true,
          fontSize: 15,
          alignment: 'center'
        },
        {
          text: `Mã HD: ${this.order._id} `,
          fontSize: 12,
          alignment: 'center'
        },
        {
          text: ' '
        },
        {
          columns: [
            [
              { text: `Ngày: ${formattedDate}` },
              { text: `Nhân viên: ${this.order.Employee[0].employeeName}` },
              { text: `Khách hàng: ${this.order.customerName}` }

              // Thêm thông tin khác nếu cần
            ],
            [
              { text: `Mã HD: ${this.order._id}`, alignment: 'right' },
              { text: `In lúc: ${formattedEndTime}`, alignment: 'right' },
              { text: `SĐT: ${this.order.customerPhone}`, alignment: 'right' }
            ]
          ]
        },
        {
          text: ' '
        },

        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto', 'auto'],
            body: [
              ['Mặt hàng', 'Số lượng', 'ĐVT', 'Giá', 'Thành tiền'],
              ...this.order.OrderDetails.map((item) => [
                item.Products[0].productName,
                item.quantity,
                'Cái',
                item.price.toLocaleString(),
                (item.price * item.quantity).toLocaleString()
              ])
            ]
          }
        },
        {
          text: ' '
        },
        {
          canvas: [{ type: 'line', x1: 0, y1: 5, x2: 520, y2: 5, lineWidth: 0.5, alignment: 'center' }]
        },
        {
          text: ' '
        },
        {
          columns: [
            [
              { text: `Tổng cộng:`, bold: true },
              {
                text: `Giảm giá hàng ${this.order.discount * 100} %`
              },
              { text: `Thanh toán:`, bold: true }
              // Thêm thông tin khác nếu cần
            ],
            [
              { text: `${this.order.sumprice.toLocaleString()} VND`, alignment: 'right' },
              {
                text: `${(this.order.sumprice * this.order.discount).toLocaleString()} VND`,
                alignment: 'right'
              },
              { text: `${this.order.finalprice.toLocaleString()} VND`, alignment: 'right' }
            ]
          ]
        },
        {
          canvas: [{ type: 'line', x1: 0, y1: 5, x2: 520, y2: 5, lineWidth: 0.5, alignment: 'center' }]
        },
        {
          text: 'Chúc quý khách một ngày vui vẻ',
          fontSize: 10,
          alignment: 'center',
          color: '#047886'
        }
        // Thêm phần thông tin bổ sung và các điều khoản và điều kiện ở đây
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15]
        }
      }
    };
    // Khởi tạo pdfMake với các font đã tải
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    // Tạo PDF từ định dạng văn bản
    let pdfDoc = pdfMake.createPdf(docDefinition);
    // In PDF
    pdfDoc.print();
  }
  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000 // Thời gian hiển thị
    });
  }
  reloadComponent(id: any) {
    const currentUrl = `/Orders/detail/${id}`;
    this.router.navigateByUrl('/reload', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
