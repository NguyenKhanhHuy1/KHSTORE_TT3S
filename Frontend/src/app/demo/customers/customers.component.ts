/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// angular import
import { Component, OnInit } from '@angular/core';

// project import
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer/customer.service';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ActivatedRoute, Routes } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export default class CustomerComponent implements OnInit {
  customers: Customer[];
  p: any;
  searchValue: any;

  constructor(private CustomerService: CustomerService) {}
  ngOnInit(): void {
    this.fetchCustomers();
  }
  fetchCustomers(): void {
    this.CustomerService.getAll().subscribe({
      next: (data) => {
        this.customers = data;
        console.log(this.customers);
      },
      error: (e) => console.error(e)
    });
  }
}
