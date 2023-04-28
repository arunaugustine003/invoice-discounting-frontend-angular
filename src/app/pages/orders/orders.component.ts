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
import { Corporate, CorporateData } from "../../interfaces/corporateList";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { TooltipPosition } from "@angular/material/tooltip";
import { FormControl } from "@angular/forms";
import { ListUniqueOrdersForCorporateUser, ListUniqueOrdersForCorporateUserData } from "../../interfaces/orderList";

@Component({
  selector: "ngx-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"],
})
export class OrdersComponent implements OnInit, OnDestroy {
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
    "orderID",
    "vendorName",
    "invoiceStatus",
    "action",
  ];
  dataSource: MatTableDataSource<any>;
  positionOptions: TooltipPosition[] = ["below", "above", "left", "right"];
  position = new FormControl(this.positionOptions[1]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private destroy$: Subject<void> = new Subject<void>();
  OrderData: ListUniqueOrdersForCorporateUserData[];
  isadmin;
  userLevelGlobal;
  constructor(
    private menuService: NbMenuService,
    private toastr: ToastrService,
    private service: AuthService,
    public dialog: MatDialog,
    private router: Router
  ) {
  }
  async ngOnInit(): Promise<void> {
    // if(!this.isAdmin){
    //   this.toastr.warning("User not authorized to view this Page", "Warning");
    //   this.navigateHome();
    // }
    let role=sessionStorage.getItem('role');
    console.log("Role=",role);
    this.userLevelGlobal=sessionStorage.getItem('user_level');
    console.log("User Level=",this.userLevelGlobal);  
    try {
      if (role==="ADMIN") {
        const data = await this.service
          .getCorporateLinked(0, 2,1, "/v1/corporate/list_corporate_orders/")
          .toPromise();
        if (data.code === "200") {
          this.totalRecordCount = data.Total_count;
          console.log("totalRecordCount=",this.totalRecordCount);
          await this.getAllSuperAdminOrders();
        }
      } else {
    this.getAllUniqueOrders();
     
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getAllSuperAdminOrders(): Promise<void> {
    try {
      const data = await this.service
        .getCorporateLinked(0, this.totalRecordCount,1, "/v1/corporate/list_corporate_orders/")
        .toPromise();
        console.log("Data=",data);
        if (data.code === "200") {
          this.OrderData = data.data;
          console.log("this.OrderData=",this.OrderData);
          this.dataSource = new MatTableDataSource(this.OrderData);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
    } catch (error) {
      console.log(error);
    }
  }
  getAllUniqueOrders() {
    this.service.get("/v1/invoice/list_only_order_user/").subscribe(
      (data: ListUniqueOrdersForCorporateUser) => {
        console.log("Data=",data);
        if (data.code === "200") {
          this.OrderData = data.data;
          console.log("this.OrderData=",this.OrderData);
          this.dataSource = new MatTableDataSource(this.OrderData);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  viewOrderDetails(id: number) {
    console.log("Clicked on Order Details", id);
    this.router.navigate(["/pages/invoices-l1", id]);
    if(this.userLevelGlobal!=0 && this.userLevelGlobal!=1 && this.userLevelGlobal>1){
    this.router.navigate(["/pages/invoices-lx", id]);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
