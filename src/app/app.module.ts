import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './components/customer/customer.component';
import { ProductComponent } from './components/product/product.component';
import { OrderComponent } from './components/order/order.component';
import 'datatables.net';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { CustomerModalComponent } from './components/customer/customer-dialog/customer-modal.component';
import { ToastrModule } from 'ngx-toastr';
import { ProductModalComponent } from './components/product/product-dialog/product-modal.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CheckoutModalComponent } from './home/checkout-dialog/checkout-modal.component';
@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    ProductComponent,
    OrderComponent,
    CustomerModalComponent,
    ProductModalComponent,
    CheckoutModalComponent,
    LoginComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    NgbToast,
    FormsModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
