// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './theme/layouts/admin/admin.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';
import CustomerComponent from './pages/customers/customers.component';
import { EditCustomerComponent } from './pages/customers/editCustomer/editCustomer.component';
import { CreateCustomerComponent } from './pages/customers/createCustomer/createCustomer.component';
import { DeleteCustomerComponent } from './pages/customers/deleteCustomer/deleteCustomer.component';
import CategoryComponent from './pages/categories/categories.component';
import { CreateCategoryComponent } from './pages/categories/createCategory/createCategory.component';
import { EditCategoryComponent } from './pages/categories/editCategory/editCategory.component';
import { DeleteCategoryComponent } from './pages/categories/deleteCategory/deleteCategory.component';
import SupplierComponent from './pages/supplier/supplier.component';
import { CreateSupplierComponent } from './pages/supplier/createSupplier/createSupplier.component';
import { EditSupplierComponent } from './pages/supplier/editSupplier/editSupplier.component';
import { DeleteSupplierComponent } from './pages/supplier/deleteSupplier/deleteSupplier.component';
import OrderlistComponent from './pages/default/orderslist/orderslist.component';
import ProductComponent from './pages/products/products.component';
import { CreateProductComponent } from './pages/products/createProduct/createProduct.component';
import { EditProductComponent } from './pages/products/editProduct/editProduct.component';
import { DeleteProductComponent } from './pages/products/deleteProduct/deleteProduct.component';
import EmployeesComponent from './pages/employees/employees.component';
import { CreateEmployeeComponent } from './pages/employees/createEmployee/createEmployee.component';
import { EditEmployeeComponent } from './pages/employees/editEmployee/editEmployee.component';
import { DeleteEmployeeComponent } from './pages/employees/deleteEmployee/deleteEmployee.component';
import LoginComponent from './pages/authentication/login/login.component';
import { AuthenticationService } from './services/authentication/authentication.service';
import { ChangepasswordComponent } from './pages/authentication/changepassword/changepassword.component';
import OrderComponent from './pages/default/order/order.component';
import { OrderdetailComponent } from './pages/default/orderslist/orderdetail/orderdetail.component';
import { AdminService } from './services/authentication/Admin.service';
import { ProfileEmployeeComponent } from './pages/authentication/profileEmployee/profileEmployee.component';
import { PaymentComponent } from './pages/payment/payment.component';
import ErrorComponent from './pages/authentication/error/error.component';

const routes: Routes = [
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthenticationService],
    children: [
      { path: 'reload', component: PaymentComponent },
      {
        path: '',
        redirectTo: '/Orders/List',
        pathMatch: 'full'
      },
      {
        path: 'Orders/List',
        component: OrderlistComponent
      },
      {
        path: 'Orders/Order',
        component: OrderComponent
      },
      {
        path: 'Orders/detail/:id',
        component: OrderdetailComponent
      },

      //loai hang
      {
        path: 'Categories',
        component: CategoryComponent
      },
      {
        path: 'Categories/create',
        component: CreateCategoryComponent
      },
      {
        path: 'Categories/:id',
        component: EditCategoryComponent
      },

      {
        path: 'Categories/delete/:id',
        component: DeleteCategoryComponent
      },

      //nha cung cap
      {
        path: 'Suppliers',
        component: SupplierComponent
      },
      {
        path: 'Suppliers/create',
        component: CreateSupplierComponent
      },
      {
        path: 'Suppliers/:id',
        component: EditSupplierComponent
      },

      {
        path: 'Suppliers/delete/:id',
        component: DeleteSupplierComponent
      },

      //khach hang
      {
        path: 'Customers',
        component: CustomerComponent
      },
      {
        path: 'Customers/create',
        component: CreateCustomerComponent
      },
      {
        path: 'Customers/:id',
        component: EditCustomerComponent
      },

      {
        path: 'Customers/delete/:id',
        component: DeleteCustomerComponent
      },
      // {
      //   path: 'Customers/Search/:searchValue',
      //   component: CustomerComponent
      // },
      //Mat Hang
      {
        path: 'Products',
        component: ProductComponent
      },
      {
        path: 'Products/create',
        component: CreateProductComponent
      },
      {
        path: 'Products/:id',
        component: EditProductComponent
      },
      {
        path: 'Products/delete/:id',
        component: DeleteProductComponent
      },
      //Nhân viên
      {
        path: 'Employees',
        component: EmployeesComponent,
        canActivate: [AdminService]
      },
      {
        path: 'Employees/create',
        component: CreateEmployeeComponent
      },
      {
        path: 'Employees/:id',
        component: EditEmployeeComponent
      },
      {
        path: 'Employees/delete/:id',
        component: DeleteEmployeeComponent
      },
      //change password
      {
        path: 'changepassword',
        component: ChangepasswordComponent
      },
      {
        path: 'profile/:id',
        component: ProfileEmployeeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
