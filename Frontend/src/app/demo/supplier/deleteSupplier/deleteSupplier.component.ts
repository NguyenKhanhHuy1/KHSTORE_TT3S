/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';
import { ConfigDeleteDiaLogComponent } from '../../ConfigDeleteDiaLog/ConfigDeleteDiaLog.component';
import { SupplierService } from 'src/app/services/supplier/supplier.service';
import { Supplier } from 'src/app/models/supplier';

@Component({
  selector: 'app-deleteSupplier',
  templateUrl: './deleteSupplier.component.html',
  styleUrls: ['./deleteSupplier.component.css']
})
export class DeleteSupplierComponent implements OnInit {
  supplier: Supplier;
  constructor(
    private route: ActivatedRoute,
    private supplierService: SupplierService,
    private location: Location,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getSupplier(this.route.snapshot.params['id']);
  }

  getSupplier(id: string): void {
    this.supplierService.get(id).subscribe({
      next: (data) => {
        this.supplier = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  goBack(): void {
    this.location.back();
  }

  deleteSupplier(id: any): void {
    this.supplierService.delete(id).subscribe({
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
        this.deleteSupplier(this.supplier._id);
      }
    });
  }
}
