/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';
import { SupplierService } from 'src/app/services/supplier/supplier.service';
import { Location } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';
import { ConfigDeleteDiaLogComponent } from '../../ConfigDeleteDiaLog/ConfigDeleteDiaLog.component';

@Component({
  selector: 'app-deleteProduct',
  templateUrl: './deleteProduct.component.html',
  styleUrls: ['./deleteProduct.component.css']
})
export class DeleteProductComponent implements OnInit {
  product: Product;
  constructor(
    private location: Location,
    private categoryService: CategoryService,
    private supplierService: SupplierService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getProduct(this.route.snapshot.params['id']);
  }
  formatPriceForDisplay() {
    if (this.product.price !== null) {
      return this.product.price.toLocaleString(); // Định dạng lại giá trị có dấu phẩy
    }
    return '';
  }

  getProduct(id: string): void {
    this.productService.get(id).subscribe({
      next: (data) => {
        this.product = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }
  goBack(): void {
    this.location.back();
  }

  deleteProduct(id: any): void {
    this.productService.delete(id).subscribe({
      next: (res) => {
        console.log(res);
        alert('Đã xóa thành công');
        this.location.back();
      },
      error: (e) => console.error(e)
    });
  }

  openConfirmDeleteDialog(): void {
    const dialogRef = this.dialog.open(ConfigDeleteDiaLogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteProduct(this.product._id);
      }
    });
  }
}
