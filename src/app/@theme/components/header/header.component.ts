import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from "@nebular/theme";

import { UserData } from "../../../@core/data/users";
import { LayoutService } from "../../../@core/utils";
import { map, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { MENU_ITEMS } from "../../../pages/pages-menu";
import { AuthService } from "../../../services/auth.service";
import { GetCurrentUser } from "../../../interfaces/genericInterface";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "ngx-header",
  styleUrls: ["./header.component.scss"],
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
  menuItems = MENU_ITEMS;

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  themes = [
    {
      value: "default",
      name: "Light",
    },
    {
      value: "dark",
      name: "Dark",
    },
    {
      value: "cosmic",
      name: "Cosmic",
    },
    {
      value: "corporate",
      name: "Corporate",
    },
  ];

  currentTheme = "default";
  userMenu = [
    { title: "Profile" },
    { title: "Log out", link: "/pages/logout" },
  ];
  selectedItem: string;
  base64image =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAG1BMVEVEeef///+4zPaKq/ChvPPn7" +
    "vxymu3Q3flbieqI1HvuAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAQUlEQVQ4jWNgGAWjgP6ASdncAEaiAhaGiACmFhCJLsMaIiDAEQEi0WXYEiMC" +
    "OCJAJIY9KuYGTC0gknpuHwXDGwAA5fsIZw0iYWYAAAAASUVORK5CYII=";

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserData,
    private toastr: ToastrService,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private service: AuthService
  ) {}

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    this.service
      .getCurrentUser("v1/current_user/get_current_user/")
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res: GetCurrentUser) => {
          if (res.code === "200") {
            console.log("Get Current User", res);
            this.user = res.data;
            let s_corporateID: number = 0;
            if (res.data.user_id === null) {
              s_corporateID = 0;
            } else {
              s_corporateID = res.data.user_id;
            }
            sessionStorage.setItem("corporateID", JSON.stringify(s_corporateID));
          } else if (res.code === "500") {
            this.toastr.error(res.get_current_user, "Error");
          } else {
            this.toastr.error("Contact Admin for more Info", "Error");
          }
        },
        (error) => {
          this.toastr.error("Something went down", "Error");
        }
      );

    // this.userService
    //   .getUsers()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((users: any) => (this.user = users.eva));

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService
      .onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (isLessThanXl: boolean) => (this.userPictureOnly = isLessThanXl)
      );

    this.themeService
      .onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$)
      )
      .subscribe((themeName) => (this.currentTheme = themeName));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
  getSelectedItem() {
    this.menuService
      .getSelectedItem("menu")
      .pipe(takeUntil(this.destroy$))
      .subscribe((menuBag) => {
        this.selectedItem = menuBag.item.title;
        console.log("this.selectedItem=", this.selectedItem);
      });
  }
  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, "menu-sidebar");
    this.layoutService.changeLayoutSize();

    return false;
  }
}
