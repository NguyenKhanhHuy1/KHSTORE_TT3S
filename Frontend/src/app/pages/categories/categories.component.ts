/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// angular import
import { Component, OnInit } from '@angular/core';

// project import
import { Category } from 'src/app/models/category';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { CategoryService } from 'src/app/services/category/category.service';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models/employee';
import { UserSessionService } from 'src/app/services/UserSession/UserSession.service';

@Component({
  selector: 'app-categiries',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export default class CategoryComponent implements OnInit {
  UserData: Employee;
  categories: Category[];
  originalCategories: Category[] = [];
  p: number = 1;

  searchValue: string;
  rowCount: number;
  page: number;

  constructor(
    private CategoryService: CategoryService,
    private usersessionService: UserSessionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchCategories();
    const savedSearchValue = localStorage.getItem('category');
    if (savedSearchValue) {
      this.searchValue = savedSearchValue;
      this.search();
    }
  }
  fetchCategories(): void {
    this.CategoryService.getAll().subscribe({
      next: (data) => {
        this.categories = data;
        this.rowCount = this.categories.length;
        this.page = Math.ceil(this.categories.length / 10);
        // this.originalCategories = [...this.categories];
        // this.onSubmit();
      },
      error: (e) => console.error(e)
    });
  }
  onSubmit() {
    if (this.searchValue) {
      localStorage.setItem('category', this.searchValue);
      this.categories = this.originalCategories.filter((category) =>
        category.categoryName.toLowerCase().includes(this.searchValue.toLowerCase())
      );
      this.rowCount = this.categories.length;
      this.page = Math.ceil(this.categories.length / 10);
    } else {
      localStorage.removeItem('category');
      this.categories = [...this.originalCategories];
      this.rowCount = this.categories.length;
      this.page = Math.ceil(this.categories.length / 10);
    }
  }
  search(): void {
    if (!this.searchValue.trim()) {
      localStorage.removeItem('category');
      this.fetchCategories();
    } else {
      localStorage.setItem('category', this.searchValue);
      this.CategoryService.search(this.searchValue).subscribe({
        next: (data) => {
          this.categories = data;
          this.rowCount = this.categories.length;
          this.page = Math.ceil(this.categories.length / 10);
        },
        error: (e) => console.error(e)
      });
    }
  }
}
