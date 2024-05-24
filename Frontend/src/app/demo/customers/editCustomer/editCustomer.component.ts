/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @angular-eslint/component-selector */
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { Location } from '@angular/common';
import { ProvinceService } from 'src/app/services/province/province.service';

@Component({
  selector: 'app-editCustomer',
  templateUrl: './editCustomer.component.html',
  styleUrls: ['./editCustomer.component.css']
})
export class EditCustomerComponent implements OnInit {
  customer: Customer = {
    customerName: '',
    contactName: '',
    province: '',
    address: '',
    email: '',
    phone: ''
  };
  submitted = false;
  listprovinces: any[];

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private location: Location,
    private provinceService: ProvinceService
  ) {}

  ngOnInit() {
    this.getCustomer(this.route.snapshot.params['id']);
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

  getCustomer(id: string): void {
    this.customerService.get(id).subscribe({
      next: (data) => {
        this.customer = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }
  updateCustomer(id: string): void {
    this.submitted = true;
    const data = {
      customerName: this.customer.customerName,
      contactName: this.customer.contactName,
      province: this.customer.province,
      address: this.customer.address,
      email: this.customer.email,
      phone: this.customer.phone
    };
    this.customerService.update(id, data).subscribe({
      next: (res) => {
        console.log(res);
        this.location.back();
      },
      error: (e) => console.error(e)
    });
  }

  goBack(): void {
    this.location.back();
  }
}
