/* eslint-disable @typescript-eslint/no-unused-vars */
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
  selector: 'app-createSupplier',
  templateUrl: './createSupplier.component.html',
  styleUrls: ['./createSupplier.component.css']
})
export class CreateSupplierComponent implements OnInit {
  newSupplier: Supplier = {
    supplierName: '',
    contactName: '',
    provinceId: '',
    address: '',
    email: '',
    phone: ''
  };
  submitted = false;
  listprovinces: any[];
  province: any;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private supplierService: SupplierService,
    private provinceService: ProvinceService,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.fetchProvince();
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

  saveSupplier(): void {
    this.submitted = true;
    if (!this.validateEmail()) {
      return;
    }
    if (!this.validateSupplierName()) {
      return;
    }
    if (!this.validateSupplierPhone()) {
      return;
    }
    const data = {
      supplierName: this.newSupplier.supplierName,
      contactName: this.newSupplier.contactName,
      provinceId: this.newSupplier.provinceId,
      address: this.newSupplier.address,
      email: this.newSupplier.email,
      phone: this.newSupplier.phone
    };
    console.log(data);
    this.supplierService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.openSnackBar('Đã thêm nhà cung cấp mới', 'Đóng');
        this.location.back();
      },
      error: (e) => console.error(e)
    });
  }

  goBack(): void {
    this.location.back();
  }
  validateSupplierPhone(): boolean {
    if (this.newSupplier.phone.length !== 10) {
      return false;
    }
    const regex = /^\d+$/;
    return regex.test(this.newSupplier.phone.toString());
  }
  validateSupplierName(): boolean {
    const regex = /^[\p{L}\p{N}\s']+$/u;
    return regex.test(this.newSupplier.supplierName.toString());
  }
  validateEmail(): boolean {
    const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return emailRegex.test(this.newSupplier.email);
  }
  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000 // Thời gian hiển thị
    });
  }
}
