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
import { MatPaginator } from "@angular/material/paginator";
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
  displayedColumns: string[] = [
    "orderID",
    "vendorID",
    "invoiceAmount",
    "invoiceUploadedbyType",
    "invoiceUploadedby",
    "invoiceStatus",
    "Status",
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
  constructor(
    private menuService: NbMenuService,
    private toastr: ToastrService,
    private service: AuthService,
    public dialog: MatDialog,
    private router: Router
  ) {
  }
  ngOnInit(): void {
    this.getAllUniqueOrders();
    // if(!this.isadmin){
    //   this.toastr.warning("User not authorized to view this Page", "Warning");
    //   this.navigateHome();
    // }
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
