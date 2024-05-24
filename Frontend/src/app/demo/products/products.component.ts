/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// angular import
import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';
import { SupplierService } from 'src/app/services/supplier/supplier.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export default class ProductComponent implements OnInit {
  products: Product[];
  originalproducts: Product[] = [];

  p: any;
  searchValue: any;
  rowCount: any;
  page: any;

  category: any = '';
  supplier: any = '';
  listCategorys: any;
  listSuppliers: any;

  constructor(
    private ProductService: ProductService,
    private categoryService: CategoryService,
    private supplierService: SupplierService
  ) {}
  ngOnInit(): void {
    this.fetchProducts();
    this.fetchCategories();
    this.fetchSuppliers();
  }
  fetchProducts(): void {
    this.ProductService.getAll().subscribe({
      next: (data) => {
        this.products = data;
        this.rowCount = this.products.length;
        this.page = Math.ceil(this.products.length / 10);
      },
      error: (e) => console.error(e)
    });
  }
  fetchCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.listCategorys = data;
      },
      error: (e) => console.error(e)
    });
  }
  displaySupplerName(supplier: any): string {
    return supplier && supplier.supplierName ? supplier.supplierName : '';
  }

  fetchSuppliers(): void {
    this.supplierService.getAll().subscribe({
      next: (data) => {
        this.listSuppliers = data;
      },
      error: (e) => console.error(e)
    });
  }
  displayCategoryName(category: any): string {
    return category && category.categoryName ? category.categoryName : '';
  }
  onSubmit() {
    if (!this.searchValue && !this.category && !this.supplier) {
      this.products = [...this.originalproducts];
      this.rowCount = this.products.length;
      this.page = Math.ceil(this.products.length / 10);
    } else {
      if (this.searchValue && this.category && this.supplier) {
        this.products = this.originalproducts.filter((product) => {
          return (
            this.category._id.toString() === product.categoryId.toString() &&
            this.supplier._id.toString() === product.supplierId.toString() &&
            product.productName.toLowerCase().includes(this.searchValue.toLowerCase())
          );
        });
      }
      if (this.searchValue && this.category && !this.supplier) {
        this.products = this.originalproducts.filter((product) => {
          return (
            this.category._id.toString() === product.categoryId.toString() &&
            product.productName.toLowerCase().includes(this.searchValue.toLowerCase())
          );
        });
      }
      if (this.searchValue && !this.category && this.supplier) {
        this.products = this.originalproducts.filter((product) => {
          return (
            this.supplier._id.toString() === product.supplierId.toString() &&
            product.productName.toLowerCase().includes(this.searchValue.toLowerCase())
          );
        });
      }
      if (this.searchValue && !this.category && !this.supplier) {
        this.products = this.originalproducts.filter((product) => {
          return product.productName.toLowerCase().includes(this.searchValue.toLowerCase());
        });
      }
      if (!this.searchValue && this.category && this.supplier) {
        this.products = this.originalproducts.filter((product) => {
          return (
            this.category._id.toString() === product.categoryId.toString() && this.supplier._id.toString() === product.supplierId.toString()
          );
        });
      }
      if (!this.searchValue && this.category && !this.supplier) {
        this.products = this.originalproducts.filter((product) => {
          return this.category._id.toString() === product.categoryId.toString();
        });
      }
      if (!this.searchValue && !this.category && this.supplier) {
        this.products = this.originalproducts.filter((product) => {
          return this.supplier._id.toString() === product.supplierId.toString();
        });
      }
      this.rowCount = this.products.length;
      this.page = Math.ceil(this.products.length / 10);
    }
  }
  search(): void {
    if ((!this.searchValue || !this.searchValue.trim()) && !this.category._id && !this.supplier._id) {
      this.fetchProducts();
    } else {
      this.ProductService.search(this.searchValue, this.category._id, this.supplier._id).subscribe({
        next: (data) => {
          this.products = data;
          this.rowCount = this.products.length;
          this.page = Math.ceil(this.products.length / 10);
        },
        error: (e) => console.error(e)
      });
    }
  }
}
