import { Component, OnInit, ViewChild } from "@angular/core";
import { NbMenuService } from "@nebular/theme";
import { Subject } from "rxjs";
import { AuthService } from "../../../services/auth.service";
import { Corporate } from "../../../interfaces/corporateList";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: "ngx-vendor-corporates",
  templateUrl: "./vendor-corporates.component.html",
  styleUrls: ["./vendor-corporates.component.scss"],
})
export class VendorCorporatesComponent implements OnInit {

   // MatPaginator Inputs
   totalRecordCount = 5;
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
    "corporateID",
    "FullName",
    "corporateEmail",
    "corporateAddress",
    "corporateContact"
  ];

   dataSource: MatTableDataSource<any>;
 
   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;
   
   private destroy$: Subject<void> = new Subject<void>();
   
   
   isAdmin = false;
   isCorporate = false;
   isCorporateUserL1 = false;
   isCorporateUserLX = false;
   vendorIDFromRoute!: number;
 
  CorporatesData: Corporate[];

  constructor(
    private service: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    let role = sessionStorage.getItem("role");
    if (role == "admin") {
    this.isAdmin = true;
    }
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((val) => {
      this.vendorIDFromRoute = val["id"];
      console.log("this.vendorIDFromRoute=", this.vendorIDFromRoute);
    });
    this.getLinkedCorporates();
  }
  async getLinkedCorporates(): Promise<void> {
    try {
      console.log("get corporatesdata of vendor -",this.vendorIDFromRoute);
      const data = await this.service
        .getVendorLinkedcorporates(
          0,
          this.totalRecordCount,
          this.vendorIDFromRoute,
          "/v1/vendor/list_corporates_ofvendores/"
        )
        .toPromise();
      if (data.code === "200") {
        this.CorporatesData = data.data;
        console.log("this.CorporatesData=", this.CorporatesData);
        this.dataSource = new MatTableDataSource(this.CorporatesData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    } catch (error) {
      console.log(error);
    }
  }
  closeVendor(){
    this.router.navigate(["/pages/vendors"]);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
