import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { CorporatesComponent } from './corporates/corporates.component';
import { VendorsComponent } from './vendors/vendors.component';
import { ReportsComponent } from './reports/reports.component';
import { SettingsComponent } from './settings/settings.component';
import { LogoutComponent } from './logout/logout.component';
import { FormsModule as AppFormsModule } from './forms/forms.module';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCorporateComponent } from './add-corporate/add-corporate.component';
import { AddVendorComponent } from './add-vendor/add-vendor.component';
@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    AppFormsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    PagesComponent,
    CorporatesComponent,
    VendorsComponent,
    ReportsComponent,
    SettingsComponent,
    LogoutComponent,    
    AddCorporateComponent,
    AddVendorComponent,
  ],
  exports:[MaterialModule]
})
export class PagesModule {
}
