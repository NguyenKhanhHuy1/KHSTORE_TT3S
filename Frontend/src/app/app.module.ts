/* eslint-disable @typescript-eslint/no-unused-vars */
// angular import
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// project import
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './theme/shared/shared.module';
import { AdminComponent } from './theme/layouts/admin/admin.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';
import { NavigationComponent } from './theme/layouts/admin/navigation/navigation.component';
import { NavBarComponent } from './theme/layouts/admin/nav-bar/nav-bar.component';
import { NavLeftComponent } from './theme/layouts/admin/nav-bar/nav-left/nav-left.component';
import { NavRightComponent } from './theme/layouts/admin/nav-bar/nav-right/nav-right.component';
import { NavContentComponent } from './theme/layouts/admin/navigation/nav-content/nav-content.component';
import { NavCollapseComponent } from './theme/layouts/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavGroupComponent } from './theme/layouts/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavItemComponent } from './theme/layouts/admin/navigation/nav-content/nav-item/nav-item.component';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import CustomerComponent from './demo/customers/customers.component';
import { EditCustomerComponent } from './demo/customers/editCustomer/editCustomer.component';
import { CreateCustomerComponent } from './demo/customers/createCustomer/createCustomer.component';

import CategoryComponent from './demo/categories/categories.component';
import { CreateCategoryComponent } from './demo/categories/createCategory/createCategory.component';
import { EditCategoryComponent } from './demo/categories/editCategory/editCategory.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ConfigDeleteDiaLogComponent } from './demo/ConfigDeleteDiaLog/ConfigDeleteDiaLog.component';

import SupplierComponent from './demo/supplier/supplier.component';
import { CreateSupplierComponent } from './demo/supplier/createSupplier/createSupplier.component';
import { EditSupplierComponent } from './demo/supplier/editSupplier/editSupplier.component';
import ProductComponent from './demo/products/products.component';
import { CreateProductComponent } from './demo/products/createProduct/createProduct.component';
import { EditProductComponent } from './demo/products/editProduct/editProduct.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from '@ngx-maintenance/ng2-search-filter';
import EmployeesComponent from './demo/employees/employees.component';
import { CreateEmployeeComponent } from './demo/employees/createEmployee/createEmployee.component';
import { EditEmployeeComponent } from './demo/employees/editEmployee/editEmployee.component';
import { FilterByCategoryNamePipe } from './demo/categories/filterbycategoryname.pipe';
import { FilterByProductNamePipe } from './demo/products/filterbyproductname.pipe';
import { FilterbysuppliernamePipe } from './demo/supplier/filterbysuppliername.pipe';
import { FilterByCustomerNamePipe } from './demo/customers/FilterByCustomerName.pipe';
import { FilterByEmployeeNamePipe } from './demo/employees/FilterByEmployeeName.pipe';
import LoginComponent from './demo/authentication/login/login.component';
import { AuthenticationService } from './services/authentication/authentication.service';
import { ChangepasswordComponent } from './demo/authentication/changepassword/changepassword.component';
import OrderComponent from './demo/default/order/order.component';

import OrderlistComponent from './demo/default/orderslist/orderslist.component';
import { FilterbyDateAndCustomerPipe } from './demo/default/orderslist/filterbyDateAndCustomer.pipe';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { OrderdetailComponent } from './demo/default/orderslist/orderdetail/orderdetail.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ScrollToTopComponent } from './demo/ScrollToTop/ScrollToTop.component';
import { ConfigDeleteOrderDiaLogComponent } from './demo/default/orderslist/ConfigDeleteOrderDiaLog/ConfigDeleteOrderDiaLog.component';
import { FilterByReasonPipe } from './demo/default/orderslist/ConfigDeleteOrderDiaLog/FilterByReason.pipe';
import { ChatSupportComponent } from './demo/ChatSupport/ChatSupport.component';
import { MatInputModule } from '@angular/material/input';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { JwtModule } from '@auth0/angular-jwt';
import { ProfileEmployeeComponent } from './demo/authentication/profileEmployee/profileEmployee.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/TokenInterceptor.service';
import { PaymentComponent } from './demo/payment/payment.component';

import { ToastrModule } from 'ngx-toastr';
import { NotifierModule, NotifierOptions } from 'angular-notifier';

const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right'
    },
    vertical: {
      position: 'top'
    }
  }
};
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    GuestComponent,
    NavigationComponent,
    NavBarComponent,
    NavLeftComponent,
    NavRightComponent,
    NavContentComponent,
    NavCollapseComponent,
    NavGroupComponent,
    NavItemComponent,
    ConfigDeleteDiaLogComponent,
    //Customer
    CustomerComponent,
    EditCustomerComponent,
    CreateCustomerComponent,
    FilterByCustomerNamePipe,
    //Category
    CategoryComponent,
    CreateCategoryComponent,
    EditCategoryComponent,
    FilterByCategoryNamePipe,
    //Supplier
    SupplierComponent,
    CreateSupplierComponent,
    EditSupplierComponent,
    FilterbysuppliernamePipe,
    //Product
    ProductComponent,
    CreateProductComponent,
    EditProductComponent,
    FilterByProductNamePipe,
    //Employee
    EmployeesComponent,
    CreateEmployeeComponent,
    EditEmployeeComponent,
    FilterByEmployeeNamePipe,
    //login
    LoginComponent,
    ChangepasswordComponent,
    //
    OrderComponent,
    OrderlistComponent,
    FilterbyDateAndCustomerPipe,
    OrderdetailComponent,
    ConfigDeleteOrderDiaLogComponent,
    FilterByReasonPipe,
    //
    ScrollToTopComponent,
    ChatSupportComponent,
    ProfileEmployeeComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbRatingModule,
    RouterModule,
    CommonModule,
    MatDialogModule,
    MatPaginatorModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatInputModule,
    MatProgressSpinnerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        }
      }
    }),
    NotifierModule.withConfig(customNotifierOptions)
  ],

  bootstrap: [AppComponent],
  providers: [provideAnimationsAsync(), AuthenticationService, { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }]
})
export class AppModule {}
