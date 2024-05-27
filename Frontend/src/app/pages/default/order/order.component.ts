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

  searchValue: string;
  searchCategory: string;
  rowCount: number;
  page: number;

  customerName: string;
  customerPhone: string;

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

  Order(c: number): void {
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

  search(categoryId: string, submit: number): void {
    if (submit === 1) {
      if ((!this.searchValue || !this.searchValue.trim()) && !categoryId) {
        this.fetchProducts();
      } else {
        this.productService.search(this.searchValue, categoryId, null, null).subscribe({
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
        this.productService.search(this.searchValue, this.searchCategory, null, null).subscribe({
          next: (data) => {
            this.listproducts = data;
          },
          error: (e) => console.error(e)
        });
      }
    }
  }

  getVoucher(id: string): void {
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

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000 // Thời gian hiển thị
    });
  }
}
