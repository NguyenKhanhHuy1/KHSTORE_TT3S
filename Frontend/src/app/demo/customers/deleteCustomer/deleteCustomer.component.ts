/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { Location } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';
import { ConfigDeleteDiaLogComponent } from '../../ConfigDeleteDiaLog/ConfigDeleteDiaLog.component';

@Component({
  selector: 'app-deleteCustomer',
  templateUrl: './deleteCustomer.component.html',
  styleUrls: ['./deleteCustomer.component.css']
})
export class DeleteCustomerComponent implements OnInit {
  customer: Customer;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private location: Location,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getCustomer(this.route.snapshot.params['id']);
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

  goBack(): void {
    this.location.back();
  }
  deleteCustomer(id: any): void {
    this.customerService.delete(id).subscribe({
      next: (res) => {
        console.log(res);
        this.location.back();
      },
      error: (e) => console.error(e)
    });
  }

  openConfirmDeleteDialog(): void {
    const dialogRef = this.dialog.open(ConfigDeleteDiaLogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteCustomer(this.customer._id);
      }
    });
  }
}
