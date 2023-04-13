import { Component, DoCheck, OnDestroy, OnInit, ViewChild } from "@angular/core";
import {
  NbMenuService,
} from "@nebular/theme";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { Corporate, CorporateData } from "../../interfaces/corporateList";
import { MatDialog } from "@angular/material/dialog";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from "@angular/router";

@Component({
  selector: 'ngx-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss']
})
export class VendorsComponent implements OnInit, DoCheck, OnDestroy {
  displayedColumns: string[] = ['vendorID','vendorName','vendorAddress','vendorEmail','vendorContact'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private destroy$: Subject<void> = new Subject<void>();
  corporateData: Corporate[];
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
    this.service.getCorporateData("/v1/corporate/list_vendors/").subscribe(
      (data: CorporateData) => {
        if (data.code === "200") {
          this.corporateData = data.data;
          console.log("this.corporateData=",this.corporateData); 
          this.dataSource=new MatTableDataSource(this.corporateData);
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
  routeAddVendor(){
    this.router.navigate(['/pages/add-vendor']);
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

