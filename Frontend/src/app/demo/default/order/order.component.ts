/* eslint-disable prefer-const */
/* eslint-disable no-misleading-character-class */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// angular import
import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { Customer } from 'src/app/models/customer';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { CustomerService } from '../../../services/customer/customer.service';
import { UserSessionService } from 'src/app/services/UserSession/UserSession.service';
import { Employee } from 'src/app/models/employee';
import { OrderService } from 'src/app/services/order/order.service';
import { OrderdetailService } from 'src/app/services/orderdetail/orderdetail.service';
import { VoucherService } from 'src/app/services/voucher/voucher.service';
import { Voucher } from 'src/app/models/voucher';
import { CategoryService } from 'src/app/services/category/category.service';
import { Category } from 'src/app/models/category';
import { Order } from 'src/app/models/order';

//
import pdfMake from 'pdfmake/build/pdfMake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { text } from 'stream/consumers';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export default class OrderComponent implements OnInit {
  listproducts: Product[];
  listcategoris: Category[];
  originalProducts: Product[] = [];

  payment: Order;

  UserData: Employee;

  searchValue: any;
  searchCategory: any;
  rowCount: any;
  page: any;

  customerName: any;
  customerPhone: any;

  quantities: { [productId: string]: number } = {};
  price: number;

  voucher: Voucher;

  codevoucher: string = '';
  submitvoucher: boolean = false;

  listProducttoCart: Cart[] = [];

  message1: string = '';
  message2: string = '';
  message3: string = '';
  message4: string = '';
  message5: string = '';
  submitted = false;

  constructor(
    private productService: ProductService,
    private usersessionService: UserSessionService,
    private orderService: OrderService,
    private orderdetailService: OrderdetailService,
    private voucherService: VoucherService,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.UserData = this.usersessionService.getSession();
    this.fetchProducts();
    this.fetchCategories();
  }

  fetchProducts(): void {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.listproducts = data;
        this.rowCount = this.listproducts.length;
        this.page = Math.ceil(this.listproducts.length / 10);
        this.listproducts.forEach((item) => {
          this.quantities[item._id] = 1;
        });
        this.originalProducts = [...this.listproducts];
      },
      error: (e) => console.error(e)
    });
  }

  AddtoCart(product): void {
    if (this.quantities[product._id] < 1) {
      return;
    }
    const cartItem: Cart = {
      orderId: '',
      productId: product._id,
      quantity: this.quantities[product._id],
      price: parseInt(product.price)
    };
    const existsProduct = this.listProducttoCart.find((item) => item.productId === cartItem.productId);
    if (existsProduct) {
      existsProduct.quantity += cartItem.quantity;
    } else {
      this.listProducttoCart.push(cartItem);
    }
  }
  sumofPrice(): number {
    const totalprice = this.listProducttoCart.reduce((total, item) => total + item.price * item.quantity, 0);
    return totalprice;
  }
  salePrice(): number {
    const totalPrice = this.sumofPrice();
    const discount = this.voucher ? this.voucher.discount : 0;
    return totalPrice * discount;
  }
  finalPrice(): number {
    const totalPrice = this.sumofPrice();
    const salePrice = this.salePrice();

    return totalPrice - salePrice;
  }
  removedProduct(productId: string): void {
    const index = this.listProducttoCart.findIndex((item) => item.productId === productId);
    if (index !== -1) {
      this.listProducttoCart.splice(index, 1);
    }
  }
  removedAll(): void {
    this.listProducttoCart = [];
  }

  Order(c: any): void {
    this.submitted = true;
    this.message1 = '';
    this.message2 = '';
    this.message3 = '';
    if (!this.validateCustomerName()) {
      return;
    }
    if (!this.validateCustomerPhone()) {
      return;
    }
    const orderTime = new Date();
    const endTime = new Date();
    const data = {
      customerName: this.customerName,
      customerPhone: this.customerPhone,
      employeeId: this.UserData._id,
      orderTime: orderTime,
      endTime: endTime,
      status: 'Đã thanh toán',
      sumprice: this.sumofPrice(),
      discount: this.voucher ? this.voucher.discount : 0,
      finalprice: this.finalPrice()
    };
    if (c == 1) {
      data.status = 'Chưa thanh toán';
      data.endTime = new Date('');
    }
    if (this.listProducttoCart.length === 0) {
      return;
    }

    this.orderService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        const orderId = res._id;
        this.listProducttoCart.forEach((cartItem) => {
          cartItem.orderId = orderId;

          this.orderdetailService.create(cartItem).subscribe({
            next: (response) => {
              // console.log(response);
            },
            error: (error) => {
              console.error(error);
            }
          });
        });
        this.openSnackBar('Đã lập đơn hàng thành công', 'Đóng');
        //Viết hàm hóa đơn ở đây
        this.orderService.get(orderId).subscribe((data) => {
          this.payment = data;
          console.log(this.payment);
          if (this.payment.status === 'Đã thanh toán') {
            this.PrintfPay();
          }
        });

        this.submitted = false;
        this.voucher = null;
        this.listProducttoCart = [];
        (this.customerName = ''), (this.customerPhone = '');
      },
      error: (e) => console.error(e)
    });
  }
  validateCustomerPhone(): boolean {
    if (this.customerPhone.length !== 10) {
      return false;
    }
    const regex = /^\d+$/;
    return regex.test(this.customerPhone.toString());
  }
  validateCustomerName(): boolean {
    const regex = /^[\p{L}\s']+$/u;
    return regex.test(this.customerName.toString());
  }
  findProductName(productId: string): string {
    const product = this.originalProducts.find((item) => item._id === productId);
    return product.productName;
  }
  // submitSearch() {
  //   if (this.searchValue) {
  //     this.listproducts = this.originalProducts.filter((product) =>
  //       product.productName.toLowerCase().includes(this.searchValue.toLowerCase())
  //     );
  //     if (this.searchCategory) {
  //       this.listproducts = this.listproducts.filter((product) => product.categoryId === this.searchCategory);
  //     }
  //   } else {
  //     this.listproducts = [...this.originalProducts];
  //     if (this.searchCategory) {
  //       this.listproducts = this.listproducts.filter((product) => product.categoryId === this.searchCategory);
  //     }
  //   }
  // }
  // submitSearchByCategory(categoryId: string) {
  //   if (categoryId && categoryId !== this.searchCategory) {
  //     this.listproducts = this.originalProducts.filter((product) => product.categoryId === categoryId);
  //     if (this.searchValue) {
  //       this.listproducts = this.listproducts.filter((product) =>
  //         product.productName.toLowerCase().includes(this.searchValue.toLowerCase())
  //       );
  //     }
  //     this.searchCategory = categoryId;
  //   } else {
  //     this.listproducts = [...this.originalProducts];
  //     this.searchCategory = '';
  //     if (this.searchValue) {
  //       this.listproducts = this.listproducts.filter((product) =>
  //         product.productName.toLowerCase().includes(this.searchValue.toLowerCase())
  //       );
  //     }
  //   }
  // }
  search(categoryId: string, submit: any): void {
    if (submit === 1) {
      if ((!this.searchValue || !this.searchValue.trim()) && !categoryId) {
        this.fetchProducts();
      } else {
        this.productService.search(this.searchValue, categoryId, null).subscribe({
          next: (data) => {
            this.listproducts = data;
          },
          error: (e) => console.error(e)
        });
      }
    } else {
      if ((!this.searchValue || !this.searchValue.trim()) && !categoryId) {
        this.fetchProducts();
      } else {
        if (categoryId && categoryId !== this.searchCategory) {
          this.searchCategory = categoryId;
        } else {
          this.searchCategory = '';
        }
        this.productService.search(this.searchValue, this.searchCategory, null).subscribe({
          next: (data) => {
            this.listproducts = data;
          },
          error: (e) => console.error(e)
        });
      }
    }
  }

  getVoucher(id: any): void {
    this.submitvoucher = true;
    if (!id) {
      return;
    }
    this.voucherService.get(id).subscribe({
      next: (data) => {
        this.voucher = data;
        this.message5 = '';
      },
      error: (e) => {
        console.error(e);
        this.message5 = 'Mã giảm giá không hợp lệ';
        if (e.status === 409) {
          this.message5 = 'Mã giảm giá đã hết hạn';
        } else {
          this.message5 = 'Mã giảm giá không hợp lệ';
          console.error(e);
        }
      }
    });
  }
  removedVoucher(): void {
    this.voucher = null;
  }

  fetchCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.listcategoris = data;
      },
      error: (e) => console.error(e)
    });
  }

  PrintfPay() {
    let orderDate = new Date(this.payment.orderTime);
    let formattedDate = `${orderDate.getDate().toString().padStart(2, '0')}/${(orderDate.getMonth() + 1).toString().padStart(2, '0')}/${orderDate.getFullYear()}`;
    let endTimeDate = new Date(this.payment.endTime);
    // Lấy giờ và phút
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
          text: `Mã HD: ${this.payment._id} `,
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
              { text: `Nhân viên: ${this.payment.Employee[0].employeeName}` },
              { text: `Khách hàng: ${this.payment.customerName}` }

              // Thêm thông tin khác nếu cần
            ],
            [
              { text: `Mã HD: ${this.payment._id}`, alignment: 'right' },
              { text: `In lúc: ${formattedEndTime}`, alignment: 'right' },
              { text: `SĐT: ${this.payment.customerPhone}`, alignment: 'right' }
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
              ...this.payment.OrderDetails.map((item) => [
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
                text: `Giảm giá hàng ${this.payment.discount * 100} %`
              },
              { text: `Thanh toán:`, bold: true }
              // Thêm thông tin khác nếu cần
            ],
            [
              { text: `${this.payment.sumprice.toLocaleString()} VND`, alignment: 'right' },
              {
                text: `${(this.payment.sumprice * this.payment.discount).toLocaleString()} VND`,
                alignment: 'right'
              },
              { text: `${this.payment.finalprice.toLocaleString()} VND`, alignment: 'right' }
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
}
