import { Component, DoCheck, OnDestroy, OnInit, ViewChild } from "@angular/core";
import {
  NbMenuService,
} from "@nebular/theme";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { AuthService } from "../../../services/auth.service";
import { Vendor, VendorData } from "../../../interfaces/vendorList";
import { MatDialog } from "@angular/material/dialog";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from "@angular/router";

@Component({
  selector: 'ngx-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit, DoCheck, OnDestroy {
  displayedColumns: string[] = ['vendorID','vendorName','vendorAddress','vendorEmail','vendorContact','action'];
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
  ngOnInit(): void {
    this.getAllVendors();

    // if(!this.isadmin){
    //   this.toastr.warning("User not authorized to view this Page", "Warning");
    //   this.navigateHome();
    // }
  }
  getAllVendors(){
    this.service.get("/v1/vendor/list_vendors/").subscribe(
      (data: VendorData) => {
        if (data.code === "200") {
          this.VendorData = data.data;
          console.log("this.VendorData=",this.VendorData); 
          this.dataSource=new MatTableDataSource(this.VendorData);
          this.dataSource.paginator=this.paginator;
          this.dataSource.sort=this.sort;
        }
      },
      (error) => {
        console.log(error);
      }
    );
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
  placeOrder(id:number){
    console.log("Clicked on Place Order", id);
    this.router.navigate(["/pages/add-order", id]);
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

