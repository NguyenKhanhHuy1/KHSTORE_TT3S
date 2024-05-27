/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { ProvinceService } from 'src/app/services/province/province.service';
import { Province } from 'src/app/models/province';

@Component({
  selector: 'app-createCustomer',
  templateUrl: './createCustomer.component.html',
  styleUrls: ['./createCustomer.component.css']
})
export class CreateCustomerComponent implements OnInit {
  newcustomer: Customer = {
    customerName: '',
    contactName: '',
    province: '',
    address: '',
    email: '',
    phone: ''
  };
  submitted = false;
  listprovinces: Province[];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private customerService: CustomerService,
    private provinceService: ProvinceService
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

  saveCustomer(): void {
    this.submitted = true;
    const data = {
      customerName: this.newcustomer.customerName,
      contactName: this.newcustomer.contactName,
      province: this.newcustomer.province,
      address: this.newcustomer.address,
      email: this.newcustomer.email,
      phone: this.newcustomer.phone
    };

    this.customerService.create(data).subscribe({
      next: (res) => {
        console.log(res);

        this.location.back();
      },
      error: (e) => console.error(e)
    });
  }

  newCustomer(): void {
    this.submitted = false;
    this.newcustomer = {
      customerName: '',
      contactName: '',
      province: '',
      address: '',
      email: '',
      phone: ''
    };
  }

  goBack(): void {
    this.location.back();
  }
}
