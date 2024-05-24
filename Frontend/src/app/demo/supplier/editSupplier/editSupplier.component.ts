/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Supplier } from 'src/app/models/supplier';
import { SupplierService } from 'src/app/services/supplier/supplier.service';
import { ProvinceService } from 'src/app/services/province/province.service';
import { Province } from 'src/app/models/province';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editSupplier',
  templateUrl: './editSupplier.component.html',
  styleUrls: ['./editSupplier.component.css']
})
export class EditSupplierComponent implements OnInit {
  supplier: Supplier = {
    supplierName: '',
    contactName: '',
    provinceId: '',
    address: '',
    email: '',
    phone: '',
    Province: []
  };
  submitted = false;
  listprovinces: Province[];

  constructor(
    private supplierService: SupplierService,
    private route: ActivatedRoute,
    private location: Location,
    private provinceService: ProvinceService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.fetchProvince();
    this.getSupplier(this.route.snapshot.params['id']);
  }
  fetchProvince(): void {
    this.provinceService.getAll().subscribe({
      next: (data) => {
        this.listprovinces = data;
        console.log(this.listprovinces);
      },
      error: (e) => console.error(e)
    });
  }
  getSupplier(id: string): void {
    this.supplierService.get(id).subscribe({
      next: (data) => {
        this.supplier = data;
        console.log(this.supplier);
      },
      error: (e) => console.error(e)
    });
  }

  updateSupplier(id: string): void {
    this.submitted = true;
    if (!this.validateEmail()) {
      return;
    }
    if (!this.validateSupplierName) {
      return;
    }
    if (!this.validateSupplierPhone) {
      return;
    }
    if (!this.supplier.provinceId) {
      return;
    }
    const data = {
      supplierName: this.supplier.supplierName,
      contactName: this.supplier.contactName,
      provinceId: this.supplier.provinceId,
      address: this.supplier.address,
      email: this.supplier.email,
      phone: this.supplier.phone
    };
    this.supplierService.update(id, data).subscribe({
      next: (res) => {
        console.log(res);
        this.openSnackBar('Cập nhật thông tin thành công', 'Đóng');
        this.location.back();
      },
      error: (e) => console.error(e)
    });
  }
  validateSupplierPhone(): boolean {
    if (this.supplier.phone.length !== 10) {
      return false;
    }
    const regex = /^\d+$/;
    return regex.test(this.supplier.phone.toString());
  }
  validateSupplierName(): boolean {
    const regex = /^[\p{L}\p{N}\s']+$/u;
    return regex.test(this.supplier.supplierName.toString());
  }
  validateEmail(): boolean {
    const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return emailRegex.test(this.supplier.email);
  }
  goBack(): void {
    this.location.back();
  }
  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000 // Thời gian hiển thị
    });
  }
}
