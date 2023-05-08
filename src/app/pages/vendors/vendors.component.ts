import {
  Component,
  DoCheck,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { NbMenuService } from "@nebular/theme";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { Vendor, VendorData } from "../../interfaces/vendorList";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";

@Component({
  selector: "ngx-vendors",
  templateUrl: "./vendors.component.html",
  styleUrls: ["./vendors.component.scss"],
})
export class VendorsComponent implements OnInit, DoCheck, OnDestroy {
  // MatPaginator Inputs
  totalRecordCount = 0;
  length = 100;
  pageSize = 5;
  pageSizeOptions: number[] = [1, 5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput
      .split(",")
      .map((str) => +str);
  }

  displayedColumns: string[] = [
    "vendorID",
    "vendorName",
    "vendorAddress",
    "vendorEmail",
    "vendorContact",
    "action" 
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private destroy$: Subject<void> = new Subject<void>();
  VendorData: Vendor[];
  isadmin = false;
  constructor(
    private menuService: NbMenuService,
    private toastr: ToastrService,
    private service: AuthService,
    public dialog: MatDialog,
    private router: Router
  ) {
    let role = sessionStorage.getItem("role");
    if (role == "admin") {
      this.isadmin = true;
    }
  }
  async ngOnInit(): Promise<void> {
    // if(!this.isAdmin){
    //   this.toastr.warning("User not authorized to view this Page", "Warning");
    //   this.navigateHome();
    // }
    try {
      const data = await this.service
        .getPaginatedList(0, 2, "/v1/vendor/list_vendors/")
        .toPromise();
      if (data.code === "200") {
        this.totalRecordCount = data.Total_count;
        await this.getAllVendors();
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getAllVendors(): Promise<void> {
    try {
      const data = await this.service
        .getPaginatedList(0, this.totalRecordCount, "/v1/vendor/list_vendors/")
        .toPromise();
      if (data.code === "200") {
        this.VendorData = data.data;
        console.log("this.VendorData=", this.VendorData);
        this.dataSource = new MatTableDataSource(this.VendorData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    } catch (error) {
      console.log(error);
    }
  }
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  vendorCorporate(id: number) {
    console.log("Clicked on vendor corporates", id);
    this.router.navigate(["/pages/vendor-corporates", id]);
  }
  routeAddVendor() {
    this.router.navigate(["/pages/add-vendor"]);
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
  ngDoCheck(): void {
    let role = sessionStorage.getItem("role");
    if (role == "admin") {
      this.isadmin = true;
    } else {
      this.isadmin = false;
    }
  }
}
