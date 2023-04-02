import { Component, OnInit } from "@angular/core";
import { MENU_ITEMS } from "./pages-menu";

@Component({
  selector: "ngx-pages",
  styleUrls: ["pages.component.scss"],
  template: `
   <ngx-one-column-layout>
      <nb-menu tag="menu" [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {
  
  ngOnInit(): void {
  }
  menu = MENU_ITEMS;
}
