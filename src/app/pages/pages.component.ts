import { Component, OnInit } from "@angular/core";
import { MENU_ITEMS } from "./pages-menu";
import { CORPORATE_MENU_ITEMS } from "./corporate-menu";
@Component({
  selector: "ngx-pages",
  styleUrls: ["pages.component.scss"],
  template: `
   <ngx-one-column-layout>
      <nb-menu tag="menu" [items]="menu" *ngIf="isadmin"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;
  corporate_menu=CORPORATE_MENU_ITEMS;
  isadmin = false;
  constructor(
  ) {
    let role = sessionStorage.getItem("role");
    if (role == "admin") {
      this.isadmin = true;
    }
  }
  ngOnInit(): void {
    console.log("this.isadmin=",this.isadmin);
  }
}
