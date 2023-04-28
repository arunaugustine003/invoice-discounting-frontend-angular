import { Component, OnInit } from "@angular/core";
import { MENU_ITEMS } from "./pages-menu";
import { CORPORATE_MENU_ITEMS } from "./corporate-menu";
import { SUPER_ADMIN_MENU_ITEMS } from "./super_admin-menu";
import { CORPORATE_USER_L1_MENU_ITEMS } from "./corporate_user-l1-menu";
import { CORPORATE_USER_LX_MENU_ITEMS } from "./corporate_user-lx-menu";
@Component({
  selector: "ngx-pages",
  styleUrls: ["pages.component.scss"],
  template: `
    <ngx-one-column-layout>
      <nb-menu tag="menu" [items]="superadmin_menu" *ngIf="isAdmin"></nb-menu>
      <nb-menu
        tag="menu"
        [items]="corporate_menu"
        *ngIf="isCorporate"
      ></nb-menu>
      <nb-menu
        tag="menu"
        [items]="corporate_user_l1_menu"
        *ngIf="isCorporateUserL1"
      ></nb-menu>
      <nb-menu
        tag="menu"
        [items]="corporate_user_lx_menu"
        *ngIf="isCorporateUserLX"
      ></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {
  menu = MENU_ITEMS;
  superadmin_menu = SUPER_ADMIN_MENU_ITEMS;
  corporate_menu = CORPORATE_MENU_ITEMS;
  corporate_user_l1_menu = CORPORATE_USER_L1_MENU_ITEMS;
  corporate_user_lx_menu = CORPORATE_USER_LX_MENU_ITEMS;
  isAdmin = false;
  isCorporate = false;
  isCorporateUserL1 = false;
  isCorporateUserLX = false;
  currCorp = null;
  constructor() {
    let role = sessionStorage.getItem("role");
    let user_level = sessionStorage.getItem("user_level");
    let cur_corporateID = sessionStorage.getItem("corporateID");
    if (role == "ADMIN") {
      this.isAdmin = true;
    } else if (role == "CORPORATE") {
      this.isCorporate = true;
      this.currCorp = cur_corporateID.toString();
    } else if (role == "USER") {
      console.log("user_level=",user_level);
      if (user_level == "1") {
        this.isCorporateUserL1 = true;
      } else {
        this.isCorporateUserLX = true;
      }
    }
  }
  ngOnInit(): void {
    if (this.isAdmin) {
      console.log(
        "Admin is Currently Logged In (True / False) =",
        this.isAdmin
      );
    } else if (this.isCorporate) {
      console.log(
        "Corporate Admin is Currently Logged In (True / False)  =",
        this.isCorporate
      );
    } else if (this.isCorporateUserL1) {
      console.log(
        "Corporate L1 User is Currently Logged In (True / False)  =",
        this.isCorporateUserL1
      );
    } else
      console.log(
        "Corporate LX User is Currently Logged In (True / False)  =",
        this.isCorporateUserLX
      );
  }
}
