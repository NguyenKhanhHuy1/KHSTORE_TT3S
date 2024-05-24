/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category/category.service';
import { Location } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';
import { ConfigDeleteDiaLogComponent } from '../../ConfigDeleteDiaLog/ConfigDeleteDiaLog.component';

@Component({
  selector: 'app-deleteCategory',
  templateUrl: './deleteCategory.component.html',
  styleUrls: ['./deleteCategory.component.css']
})
export class DeleteCategoryComponent implements OnInit {
  category: Category;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private location: Location,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getCategory(this.route.snapshot.params['id']);
  }

  getCategory(id: string): void {
    this.categoryService.get(id).subscribe({
      next: (data) => {
        this.category = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }
  deleteCategory(id: any): void {
    this.categoryService.delete(id).subscribe({
      next: (res) => {
        console.log(res);

        this.location.back();
        alert('Đã xóa một loại hàng');
      },
      error: (e) => console.error(e)
    });
  }
  goBack(): void {
    this.location.back();
  }
  openConfirmDeleteDialog(): void {
    const dialogRef = this.dialog.open(ConfigDeleteDiaLogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteCategory(this.category._id);
      }
    });
  }
}
