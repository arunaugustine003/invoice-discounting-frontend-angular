import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { PagesComponent } from "./pages.component";
import { ECommerceComponent } from "./e-commerce/e-commerce.component";
import { NotFoundComponent } from "./miscellaneous/not-found/not-found.component";
import { CorporatesComponent } from "./corporates/corporates.component";
import { VendorsComponent } from "./vendors/vendors.component";
import { ReportsComponent } from "./reports/reports.component";
import { SettingsComponent } from "./settings/settings.component";
import { LogoutComponent } from "./logout/logout.component";
import { LoginComponent } from "../login/login.component";
import { IconsComponent } from "./ui-features/icons/icons.component";
import { TablesComponent } from "./tables/tables.component";
import { SmartTableComponent } from "./tables/smart-table/smart-table.component";
import { ButtonsComponent } from "./forms/buttons/buttons.component";
import { AddCorporateComponent } from "./add-corporate/add-corporate.component";
import { AddVendorComponent } from "./add-vendor/add-vendor.component";
import { CorporateUsersComponent } from "./corporate-users/corporate-users.component";
import { AddCorporateUserComponent } from "./add-corporate-user/add-corporate-user.component";

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: "dashboard",
        component: ECommerceComponent,
      },
      {
        path: "corporates",
        component: CorporatesComponent,
      },
      {
        path: "vendors",
        component: VendorsComponent,
      },
      {
        path: "reports",
        component: ReportsComponent,
      },
      {
        path: "settings",
        component: SettingsComponent,
      },
      {
        path: "add-corporate",
        component: AddCorporateComponent,
      },
      {
        path: "update-corporate/:id",
        component: AddCorporateComponent,
      },
      {
        path: "corporate-users/:id",
        component: CorporateUsersComponent,
      },
      {
        path: "add-corporate-user",
        component: AddCorporateUserComponent,
      },
      {
        path: "add-vendor",
        component: AddVendorComponent,
      },
      {
        path: "smart-table",
        component: SmartTableComponent,
      },
      {
        path: "icons",
        component: IconsComponent,
      },
      {
        path: "logout",
        component: LogoutComponent,
      },
      {
        path: "login",
        component: LoginComponent,
      },
      {
        path: "buttons",
        component: ButtonsComponent,
      },
      {
        path: "layout",
        loadChildren: () =>
          import("./layout/layout.module").then((m) => m.LayoutModule),
      },
      {
        path: "forms",
        loadChildren: () =>
          import("./forms/forms.module").then((m) => m.FormsModule),
      },
      {
        path: "ui-features",
        loadChildren: () =>
          import("./ui-features/ui-features.module").then(
            (m) => m.UiFeaturesModule
          ),
      },
      {
        path: "modal-overlays",
        loadChildren: () =>
          import("./modal-overlays/modal-overlays.module").then(
            (m) => m.ModalOverlaysModule
          ),
      },
      {
        path: "extra-components",
        loadChildren: () =>
          import("./extra-components/extra-components.module").then(
            (m) => m.ExtraComponentsModule
          ),
      },
      {
        path: "maps",
        loadChildren: () =>
          import("./maps/maps.module").then((m) => m.MapsModule),
      },
      {
        path: "charts",
        loadChildren: () =>
          import("./charts/charts.module").then((m) => m.ChartsModule),
      },
      {
        path: "editors",
        loadChildren: () =>
          import("./editors/editors.module").then((m) => m.EditorsModule),
      },
      {
        path: "tables",
        loadChildren: () =>
          import("./tables/tables.module").then((m) => m.TablesModule),
      },
      {
        path: "miscellaneous",
        loadChildren: () =>
          import("./miscellaneous/miscellaneous.module").then(
            (m) => m.MiscellaneousModule
          ),
      },
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full",
      },
      {
        path: "**",
        component: NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
