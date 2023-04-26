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
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { TooltipPosition } from "@angular/material/tooltip";
import { FormControl } from "@angular/forms";
import { ListUniqueOrdersForCorporateUser, ListUniqueOrdersForCorporateUserData } from "../../../interfaces/orderList";
import { ApproveInvoice, RejectInvoice, ViewInvoiceDocument } from "../../../interfaces/invoiceList";

@Component({
  selector: 'ngx-invoices-l2',
  templateUrl: './invoices-l2.component.html',
  styleUrls: ['./invoices-l2.component.scss']
})
export class InvoicesL2Component implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    "invoiceID",
    "invoiceNO",
    "vendorID",
    "invoiceAmount",
    "invoiceUploadedby",
    "invoiceStatus",
    "action",
  ];
  orderIDFetched;
  dataSource: MatTableDataSource<any>;
  positionOptions: TooltipPosition[] = ["below", "above", "left", "right"];
  position = new FormControl(this.positionOptions[1]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private destroy$: Subject<void> = new Subject<void>();
  OrderData: ListUniqueOrdersForCorporateUserData[];
  isadmin;
  title:string;
  constructor(
    private menuService: NbMenuService,
    private toastr: ToastrService,
    private service: AuthService,
    public dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((val) => {
      this.orderIDFetched = val["id"];
      if (this.orderIDFetched) {
        this.service
          .getInvoicesByID(
            this.orderIDFetched,
            "/v1/invoice/filter_order_by_orderID/"
          )
          .subscribe({
            next: (res) => {
              console.log("res.data[0]=", res.data[0]);
            },
            error: (err) => {
              console.log(err);
            },
          });
      }
    });
    this.getAllUniqueOrders();
    if (this.router.url.toLowerCase().includes("invoices-l2")) {
      let user_level = sessionStorage.getItem("user_level");
      console.log("global_user_level=", user_level);
      this.title = "Invoices List for Users of User Level " + user_level;
    }
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

  viewInvoice(id: number) {
    console.log("Clicked on View Invoice", id);    
    this.service.getInvoiceDocument(id,"/v1/invoice/view_document_invoice/").subscribe(
      (data: ViewInvoiceDocument) => {
        console.log("Data=",data);
        if (data.code === "200") {
          const presignedURL=data.data;
          console.log("Data URL=",presignedURL);
          window.open(presignedURL);
        }
      },
      (error) => {
        console.log(error);
      }
    );
    this.router.navigate(["/pages/invoices-l2", 1]);
  }
  approveInvoice(id: number) {
    console.log("Clicked on Approve Invoice", id);
    this.service.approveOrRejectInvoice(id,"/v1/invoice/approove_document_invoice/").subscribe(
      (res: ApproveInvoice) => {
        console.log("Data=",res);
        if (res.code === "200") {
          this.toastr.success(
            "Invoice Approved Successfully",
            "Success 🐱‍🏍"
          );
          this.router.navigate(["/pages/invoices-l2", 1]);
        } else if (res.code === "500") {
          this.toastr.error(res.approve_document_invoice, "Error ❌");
        } else {
          this.toastr.error("Contact Admin for more Info", "Error ❌");
        }
      },
      (error) => {
        console.log(error);
        this.toastr.error("Something went down", "Error ❌");
      }
    );
    this.router.navigate(["/pages/invoices-l2", 1]);
  }
  rejectInvoice(id: number) {
    console.log("Clicked on Reject Invoice", id);
    this.service.approveOrRejectInvoice(id,"/v1/invoice/reject_document_invoice/").subscribe(
      (res: RejectInvoice) => {
        console.log("Data=",res);
        if (res.code === "200") {
          this.toastr.success(
            "Invoice Rejected Successfully",
            "Success 🐱‍🏍"
          );
          this.router.navigate(["/pages/invoices-l2", 1]);
        } else if (res.code === "500") {
          this.toastr.error(res.reject_document_invoice, "Error ❌");
        } else {
          this.toastr.error("Contact Admin for more Info", "Error ❌");
        }
      },
      (error) => {
        console.log(error);
        this.toastr.error("Something went down", "Error ❌");
      }
    );
    this.router.navigate(["/pages/invoices-l2", 1]);
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
