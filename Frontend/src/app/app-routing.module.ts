// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './theme/layouts/admin/admin.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';
import CustomerComponent from './demo/customers/customers.component';
import { EditCustomerComponent } from './demo/customers/editCustomer/editCustomer.component';
import { CreateCustomerComponent } from './demo/customers/createCustomer/createCustomer.component';
import { DeleteCustomerComponent } from './demo/customers/deleteCustomer/deleteCustomer.component';
import CategoryComponent from './demo/categories/categories.component';
import { CreateCategoryComponent } from './demo/categories/createCategory/createCategory.component';
import { EditCategoryComponent } from './demo/categories/editCategory/editCategory.component';
import { DeleteCategoryComponent } from './demo/categories/deleteCategory/deleteCategory.component';
import SupplierComponent from './demo/supplier/supplier.component';
import { CreateSupplierComponent } from './demo/supplier/createSupplier/createSupplier.component';
import { EditSupplierComponent } from './demo/supplier/editSupplier/editSupplier.component';
import { DeleteSupplierComponent } from './demo/supplier/deleteSupplier/deleteSupplier.component';
import OrderlistComponent from './demo/default/orderslist/orderslist.component';
import ProductComponent from './demo/products/products.component';
import { CreateProductComponent } from './demo/products/createProduct/createProduct.component';
import { EditProductComponent } from './demo/products/editProduct/editProduct.component';
import { DeleteProductComponent } from './demo/products/deleteProduct/deleteProduct.component';
import EmployeesComponent from './demo/employees/employees.component';
import { CreateEmployeeComponent } from './demo/employees/createEmployee/createEmployee.component';
import { EditEmployeeComponent } from './demo/employees/editEmployee/editEmployee.component';
import { DeleteEmployeeComponent } from './demo/employees/deleteEmployee/deleteEmployee.component';
import LoginComponent from './demo/authentication/login/login.component';
import { AuthenticationService } from './services/authentication/authentication.service';
import { ChangepasswordComponent } from './demo/authentication/changepassword/changepassword.component';
import OrderComponent from './demo/default/order/order.component';
import { OrderdetailComponent } from './demo/default/orderslist/orderdetail/orderdetail.component';
import { AdminService } from './services/authentication/Admin.service';
import { ProfileEmployeeComponent } from './demo/authentication/profileEmployee/profileEmployee.component';
import { PaymentComponent } from './demo/payment/payment.component';

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
    path: '',
    component: AdminComponent,
    canActivate: [AuthenticationService],
    children: [
      {
        path: 'payment',
        component: PaymentComponent
      },
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
