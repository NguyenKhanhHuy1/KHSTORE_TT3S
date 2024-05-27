/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { FormControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { CategoryService } from 'src/app/services/category/category.service';
import { SupplierService } from 'src/app/services/supplier/supplier.service';
import { ProductService } from 'src/app/services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { error } from 'console';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editProduct',
  templateUrl: './editProduct.component.html',
  styleUrls: ['./editProduct.component.css']
})
export class EditProductComponent implements OnInit {
  product: Product = {
    productName: '',
    productDescription: '',
    supplierId: '',
    categoryId: '',
    unit: '',
    price: 0,
    photo: ''
  };

  listCategorys: any;
  listSuppliers: any;
  file: any;
  preview: any;
  submitted: false;

  constructor(
    private location: Location,
    private categoryService: CategoryService,
    private supplierService: SupplierService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.fetchCategories();
    this.fetchSuppliers();
    this.getProduct(this.route.snapshot.params['id']);
  }
  formattedPrice: string | null = null;
  formatPrice(value: string) {
    const numberValue = Number(value.replace(/[^0-9]/g, '')); // Loại bỏ tất cả các ký tự không phải số
    this.formattedPrice = numberValue.toLocaleString(); // Định dạng lại số với dấu phẩy
    this.product.price = numberValue;
  }
  formatPriceForDisplay() {
    if (this.product.price !== null) {
      return this.product.price.toLocaleString(); // Định dạng lại giá trị có dấu phẩy
    }
    return '';
  }
  fetchCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.listCategorys = data;
      },
      error: (e) => console.error(e)
    });
  }
  fetchSuppliers(): void {
    this.supplierService.getAll().subscribe({
      next: (data) => {
        this.listSuppliers = data;
      },
      error: (e) => console.error(e)
    });
  }

  getProduct(id: string): void {
    this.productService.get(id).subscribe({
      next: (data) => {
        this.product = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }
  selectFile(event: any) {
    this.file = event.target.files[0];
    console.log(this.file);
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = (e: any) => {
      this.preview = e.target.result;
    };
  }
  saveProduct(id: any) {
    if (!this.validatePrice()) {
      return;
    }
    if (this.file) {
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        const base64Data = reader.result?.toString();
        const data = {
          productName: this.product.productName,
          productDescription: this.product.productDescription,
          supplierId: this.product.supplierId,
          categoryId: this.product.categoryId,
          unit: this.product.unit,
          price: this.product.price,
          photo: base64Data
        };
        this.productService.update(id, data).subscribe({
          next: (res) => {
            this.openSnackBar('Đã cập nhật thông tin mặt hàng', 'Đóng');
            this.location.back();
          },
          error: (e) => console.error(e)
        });
      };
    } else {
      const data = {
        productName: this.product.productName,
        productDescription: this.product.productDescription,
        supplierId: this.product.supplierId,
        categoryId: this.product.categoryId,
        unit: this.product.unit,
        price: this.product.price,
        photo: this.product.photo
      };
      console.log(data);
      this.productService.update(id, data).subscribe({
        next: (res) => {
          this.openSnackBar('Đã cập nhật thông tin mặt hàng', 'Đóng');
          this.location.back();
        },
        error: (e) => console.error(e)
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
  validatePrice(): boolean {
    if (this.product.price < 0) {
      return false;
    }
    const regex = /^\d{1,}(,\d{3})*(\.\d{1,2})?$/;
    return regex.test(this.product.price.toString());
  }
  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000 // Thời gian hiển thị
    });
  }
}
