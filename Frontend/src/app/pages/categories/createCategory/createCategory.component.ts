/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-createCategory',
  templateUrl: './createCategory.component.html',
  styleUrls: ['./createCategory.component.css']
})
export class CreateCategoryComponent {
  newcategory: Category = {
    categoryName: '',
    Description: ''
  };
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar
  ) {}

  saveCategory(): void {
    this.submitted = true;
    if (!this.validateCategoryName()) {
      return;
    }
    const data = {
      categoryName: this.newcategory.categoryName,
      Description: this.newcategory.Description
    };
    this.categoryService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.openSnackBar('Đã thêm loại hàng mới', 'Đóng');
        this.location.back();
      },
      error: (e) => console.error(e)
    });
  }

  newCategory(): void {
    this.submitted = false;
    this.newcategory = {
      categoryName: '',
      Description: ''
    };
  }

  goBack(): void {
    this.location.back();
  }
  validateCategoryName(): boolean {
    const regex = /^[\p{L}\s']+$/u;
    return regex.test(this.newcategory.categoryName.toString());
  }
  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000 // Thời gian hiển thị
    });
  }
}
