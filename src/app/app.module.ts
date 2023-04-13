import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
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
import { FormsModule as AppFormsModule } from '../app/pages/forms/forms.module';
import { CorporateUsersComponent } from './pages/corporate-users/corporate-users.component';
import { AddCorporateUserComponent } from './pages/add-corporate-user/add-corporate-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VerifyOtpComponent,
    FormatTimePipe,
    CorporateUsersComponent,
    AddCorporateUserComponent, 
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
  exports: [FormatTimePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
