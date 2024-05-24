/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @angular-eslint/component-selector */
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editCategory',
  templateUrl: './editCategory.component.html',
  styleUrls: ['./editCategory.component.css']
})
export class EditCategoryComponent implements OnInit {
  category: Category = {
    categoryName: '',
    Description: ''
  };
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private location: Location,
    private snackBar: MatSnackBar
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

  updateCategory(id: string): void {
    this.submitted = true;
    if (!this.validateCategoryName()) {
      return;
    }
    const data = {
      categoryName: this.category.categoryName,
      Description: this.category.Description
    };
    this.categoryService.update(id, data).subscribe({
      next: (res) => {
        this.openSnackBar('Đã cập nhật thông tin loại hàng', 'Đóng');
        this.location.back();
      },
      error: (e) => console.error(e)
    });
  }

  goBack(): void {
    this.location.back();
  }
  validateCategoryName(): boolean {
    const regex = /^[\p{L}\s']+$/u;
    return regex.test(this.category.categoryName.toString());
  }
  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000 // Thời gian hiển thị
    });
  }
}
