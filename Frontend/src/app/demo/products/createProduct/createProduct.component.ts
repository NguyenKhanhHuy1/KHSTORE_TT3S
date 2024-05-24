/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/component-selector */
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';

import { CategoryService } from 'src/app/services/category/category.service';
import { SupplierService } from 'src/app/services/supplier/supplier.service';
import { FormControl, FormGroup } from '@angular/forms';
import { error } from 'console';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-createProduct',
  templateUrl: './createProduct.component.html',
  styleUrls: ['./createProduct.component.css']
})
export class CreateProductComponent implements OnInit {
  listCategorys: any;
  listSuppliers: any;
  file: any;
  preview: any;
  submitted = false;

  product: Product = {
    photo: '',
    productName: '',
    productDescription: '',
    categoryId: '',
    supplierId: '',
    unit: 'Cái',
    price: 1
  };
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private productService: ProductService,
    private categoryService: CategoryService,
    private supplierService: SupplierService,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.fetchCategories();
    this.fetchSuppliers();
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
  saveProduct() {
    this.submitted = true;
    if (!this.validatePrice()) {
      return;
    }
    if (this.file) {
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        const base64Data = reader.result?.toString(); // Split để loại bỏ phần metadata
        const data = {
          productName: this.product.productName,
          productDescription: this.product.productDescription,
          categoryId: this.product.categoryId,
          supplierId: this.product.supplierId,
          unit: this.product.unit,
          price: this.product.price,
          photo: base64Data
        };
        console.log(data);
        this.productService.create(data).subscribe((data) => {
          if (data) {
            this.openSnackBar('Đã thêm mặt hàng mới', 'Đóng');
            this.location.back();
          }
        });
      };
    } else {
      const data = {
        productName: this.product.productName,
        productDescription: this.product.productDescription,
        categoryId: this.product.categoryId,
        supplierId: this.product.supplierId,
        unit: this.product.unit,
        price: this.product.price,
        photo: this.product.photo
      };
      this.productService.create(data).subscribe((data) => {
        if (data) {
          this.openSnackBar('Đã thêm mặt hàng mới', 'Đóng');
          this.location.back();
        }
      });
    }
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

  goBack(): void {
    this.location.back();
  }
  validatePrice(): boolean {
    if (this.product.price <= 0) {
      return false;
    }
    const regex = /^\d+$/;
    return regex.test(this.product.price.toString());
  }
  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000 // Thời gian hiển thị
    });
  }
}
