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
import { AuthService } from "../../../services/auth.service";
import {
  ListCorporateVendor,
  ListCorporateVendorData,
  Vendor,
  VendorData,
} from "../../../interfaces/vendorList";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "ngx-place-order-corporate",
  templateUrl: "./place-order-corporate.component.html",
  styleUrls: ["./place-order-corporate.component.scss"],
})
export class PlaceOrderCorporateComponent implements OnInit, DoCheck, OnDestroy {
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
    "action",
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private destroy$: Subject<void> = new Subject<void>();
  VendorData: Vendor[];
  LinkedVendorData: ListCorporateVendorData[];
  isAdmin = false;
  isCorporate = false;
  corporateIDFromRoute!: number;

  constructor(
    private menuService: NbMenuService,
    private toastr: ToastrService,
    private service: AuthService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {

  }
  ngDoCheck(): void {
    let role = sessionStorage.getItem("role");
    console.log(role);
    if (role == "ADMIN") {
      this.isAdmin = true;
    }else{
      this.isAdmin=false;
    }
    if (role == "CORPORATE") {
      this.isCorporate = true;
    }else{
      this.isCorporate = false;
    }
  }
  async ngOnInit(): Promise<void> {
    // if(!this.isAdmin){
    //   this.toastr.warning("User not authorized to view this Page", "Warning");
    //   this.navigateHome();
    // }
    this.activatedRoute.params.subscribe((val) => {
      this.corporateIDFromRoute = val["id"];
      console.log("this.corporateIDFromRoute=", this.corporateIDFromRoute);
    });
    try {

      
        const data = await this.service
              .getCorporateLinkedVendors(
                0,
                5,
                "/v1/vendor/list_vendors_onlycorporate/"
              ).toPromise();
              if (data.code === "200") {
                this.totalRecordCount = data.Total_count;
                await this.getLinkedVendors();
              }
      
    
    } catch (error) {
      console.log(error);
    }
  }

  async getAllVendors(): Promise<void> {
    try {
      const data = await this.service
        .getPaginatedList(0, this.totalRecordCount, "/v1/vendor/list_vendors_onlycorporate/")
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
  async getLinkedVendors(): Promise<void> {
    try {
      const data = await this.service
        .getCorporateLinked(
          0,
          this.totalRecordCount,
          this.corporateIDFromRoute,
          "/v1/vendor/list_vendors_onlycorporate/"
        )
        .toPromise();
      if (data.code === "200") {
        this.LinkedVendorData = data.data;
        console.log("this.LinkedVendorData=", this.LinkedVendorData);
        this.dataSource = new MatTableDataSource(this.LinkedVendorData);
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
  placeOrder(id: number) {
    console.log("Clicked on Place Order", id);
    this.router.navigate(["/pages/add-order", id]);
  }
  viewCorrespondingOrders(id: number,cid :number) {
    console.log(cid);
    const param_id = id + '/' + cid;
    let i = `/pages/vendor-orders/${param_id}`;
    i= decodeURIComponent(i);
    console.log("Clicked on View Corresponding Orders", id);
    this.router.navigate([i]);
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
  routeAddCorporateVendor() {
    this.router.navigate(["/pages/add-vendor"]);
  }

}
