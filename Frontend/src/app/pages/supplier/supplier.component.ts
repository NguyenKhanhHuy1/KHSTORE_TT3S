/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// angular import
import { Component, OnInit } from '@angular/core';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Supplier } from 'src/app/models/supplier';
import { SupplierService } from 'src/app/services/supplier/supplier.service';
@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export default class SupplierComponent implements OnInit {
  suppliers: Supplier[];
  originalsuppliers: Supplier[] = [];
  p: any;

  searchValue: any;
  rowCount: any;
  page: any;

  ngOnInit(): void {
    this.fetchSuppliers();
    const savedSearchValue = localStorage.getItem('supplier');
    if (savedSearchValue) {
      this.searchValue = savedSearchValue;
      this.search();
    }
  }
  constructor(private supplierService: SupplierService) {}
  fetchSuppliers(): void {
    this.supplierService.getAll().subscribe({
      next: (data) => {
        this.suppliers = data;
        console.log(this.suppliers);
        this.rowCount = this.suppliers.length;
        this.page = Math.ceil(this.suppliers.length / 10);
      },
      error: (e) => console.error(e)
    });
  }

  onSubmit() {
    if (this.searchValue) {
      localStorage.setItem('supplier', this.searchValue); // lưu giá trị tìm kiếm
      this.suppliers = this.originalsuppliers.filter((supplier) =>
        supplier.supplierName.toLowerCase().includes(this.searchValue.toLowerCase())
      );
      this.rowCount = this.suppliers.length;
      this.page = Math.ceil(this.suppliers.length / 10);
    } else {
      // Xóa giá trị tìm kiếm từ localStorage
      localStorage.removeItem('supplier');

      this.suppliers = [...this.originalsuppliers];
      this.rowCount = this.suppliers.length;
      this.page = Math.ceil(this.suppliers.length / 10);
    }
  }
  search(): void {
    if (!this.searchValue.trim()) {
      localStorage.removeItem('supplier');
      this.fetchSuppliers();
    } else {
      localStorage.setItem('supplier', this.searchValue);
      this.supplierService.search(this.searchValue).subscribe({
        next: (data) => {
          this.suppliers = data;
          this.rowCount = this.suppliers.length;
          this.page = Math.ceil(this.suppliers.length / 10);
        },
        error: (e) => console.error(e)
      });
    }
  }
}
