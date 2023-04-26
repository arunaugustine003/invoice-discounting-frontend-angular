import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CUSTOM_ELEMENTS_SCHEMA,NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CoreModule } from "./@core/core.module";
import { ThemeModule } from "./@theme/theme.module";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import {
  NbButtonModule,
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from "@nebular/theme";
import { ToastrModule } from "ngx-toastr";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./login/login.component";
import { VerifyOtpComponent } from "./verify-otp/verify-otp.component";
import { NgOtpInputModule } from "ng-otp-input";
import { FormatTimePipe } from "./pipes/time-format";
import { PagesModule } from "./pages/pages.module";
import { FormsModule as AppFormsModule } from "../app/pages/forms/forms.module";
import { CorporateUsersComponent } from "./pages/corporate-users/corporate-users.component";
import { AddCorporateUserComponent } from "./pages/corporate-users/add-corporate-user/add-corporate-user.component";
import { TokenInterceptorService } from "./services/token-interceptor.service";
import { OrdersComponent } from './pages/orders/orders.component';
import { AddOrderComponent } from './pages/orders/add-order/add-order.component';
import { DndDirective } from "./directives/dnd.directive";
import { PlaceOrderComponent } from './pages/orders/place-order/place-order.component';
import { InvoicesL1Component } from './pages/invoices/invoices-l1/invoices-l1.component';
import { InvoicesL2Component } from './pages/invoices/invoices-l2/invoices-l2.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { InvoicesL3Component } from './pages/invoices/invoices-l3/invoices-l3.component';
import { VendorOrdersComponent } from './pages/vendor-orders/vendor-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    DndDirective,
    LoginComponent,
    VerifyOtpComponent,
    FormatTimePipe,
    CorporateUsersComponent,
    AddCorporateUserComponent,
    OrdersComponent,
    AddOrderComponent,
    PlaceOrderComponent,
    InvoicesL1Component,
    InvoicesL2Component,
    InvoicesComponent,
    InvoicesL3Component,
    VendorOrdersComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgOtpInputModule,
    NbButtonModule,
    PagesModule,
    AppFormsModule,
    NbButtonModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: "AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY",
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    ToastrModule.forRoot(),
  ],
  exports: [FormatTimePipe,DndDirective],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule {}
