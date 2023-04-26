import { Component, OnInit } from "@angular/core";
import { MENU_ITEMS } from "./pages-menu";
import { CORPORATE_MENU_ITEMS } from "./corporate-menu";
import { SUPER_ADMIN_MENU_ITEMS } from "./super_admin-menu";
@Component({
  selector: "ngx-pages",
  styleUrls: ["pages.component.scss"],
  template: `
    <ngx-one-column-layout>
      <nb-menu tag="menu" [items]="superadmin_menu" *ngIf="isAdmin"></nb-menu>
      <nb-menu tag="menu" [items]="corporate_menu" *ngIf="isCorporate"></nb-menu>
      <nb-menu tag="menu" [items]="menu" *ngIf="isCorporateUserL1"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {
  menu = MENU_ITEMS;
  superadmin_menu = SUPER_ADMIN_MENU_ITEMS;
  corporate_menu = CORPORATE_MENU_ITEMS;
  isAdmin = false;
  isCorporate = false;
  isCorporateUserL1 = false;
  isCorporateUserL2 = false;
  isCorporateUserL3 = false;
  constructor() {
    let role = sessionStorage.getItem("role");
    if (role == "ADMIN") {
      this.isAdmin = true;
    } else if (role == "CORPORATE") {
      this.isCorporate = true;
    }else{
      this.isCorporateUserL1 = true;
      // if(user_level){}
      // else(){}
    }
  }
  ngOnInit(): void {
    console.log("this.isAdmin=", this.isAdmin);
    console.log("this.isCorporate=", this.isCorporate);
  }
}
