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
import { AddCorporateComponent } from "./corporates/add-corporate/add-corporate.component";
import { AddVendorComponent } from "./vendors/add-vendor/add-vendor.component";
import { CorporateUsersComponent } from "./corporate-users/corporate-users.component";
import { AddCorporateUserComponent } from "./corporate-users/add-corporate-user/add-corporate-user.component";
import { OrdersComponent } from "./orders/orders.component";
import { AddOrderComponent } from "./orders/add-order/add-order.component";
import { PlaceOrderComponent } from "./orders/place-order/place-order.component";
import { PlaceOrderCorporateComponent } from "./orders/place-order-corporate/place-order-corporate.component";
import { InvoicesL1Component } from "./invoices/invoices-l1/invoices-l1.component";
import { VendorOrdersComponent } from "./vendor-orders/vendor-orders.component";
import { VendorCorporatesComponent } from "./vendors/vendor-corporates/vendor-corporates.component";
import { InvoicesLxComponent } from "./invoices/invoices-lx/invoices-lx.component";
import { UpdateInvoiceComponent } from "./update-invoice/update-invoice.component";

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
        path: "corporate-users",
        redirectTo: "corporate-users/1",
        pathMatch: "full",
      },
      {
        path: "corporate-users/:id",
        component: CorporateUsersComponent,
      },
      {
        path: "add-corporate-user/:id",
        component: AddCorporateUserComponent,
      },
      {
        path: "update-corporate-user/:id",
        component: AddCorporateUserComponent,
      },
      {
        path: "add-vendor",
        component: AddVendorComponent,
      },
      {
        path: "orders",
        component: OrdersComponent,
      },
      {
        path: "place-order",
        component: PlaceOrderComponent,
      },
      {
        path: "place-order/:id",
        component: PlaceOrderComponent,
      },
      {
        path: "place-order-corporate",
        component: PlaceOrderCorporateComponent,
      },
      {
        path: "vendor-orders/:id",
        component: VendorOrdersComponent,
      },
      {
        path: "vendor-orders/:id/:cid",
        component: VendorOrdersComponent,
      },
      {
        path: "invoices-l1/:id",
        component: InvoicesL1Component,
      },
      {
        path: "update-invoice/:id",
        component: UpdateInvoiceComponent,
      },
      {
        path: "invoices-l1/:id/:cid",
        component: InvoicesL1Component,
      },
      {
        path: "add-invoice/:id",
        component: AddOrderComponent,
      },
      {
        path: "invoices-lx/:id",
        component: InvoicesLxComponent,
      },
      {
        path: "add-order/:id",
        component: AddOrderComponent,
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
        path: "vendor-corporates/:id",
        component: VendorCorporatesComponent,
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
