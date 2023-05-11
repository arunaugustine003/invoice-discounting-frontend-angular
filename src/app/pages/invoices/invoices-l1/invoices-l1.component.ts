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
import { Corporate, CorporateData } from "../../../interfaces/corporateList";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { TooltipPosition } from "@angular/material/tooltip";
import { FormControl } from "@angular/forms";
import {
  ListUniqueOrdersForCorporateUser,
  ListUniqueOrdersForCorporateUserData,
  ListUniqueOrdersForSuperAdmin,
  ListUniqueOrdersForCorporateAdmin,
} from "../../../interfaces/orderList";
import { ApproveBulkUploadResponse, ApproveInvoice, ViewInvoiceDocument } from "../../../interfaces/invoiceList";
import { DatePipe } from "@angular/common";
import { MatTable } from '@angular/material/table';

@Component({
  selector: "ngx-invoices-l1",
  templateUrl: "./invoices-l1.component.html",
  styleUrls: ["./invoices-l1.component.scss"],
})
export class InvoicesL1Component implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    "invoiceID",
    "invoiceNO",
    "invoiceAmount",
    "Invoice_Date",
    "financeAmount",
    "invoiceStatus",
    "user_level",
    "action",
  ];
  orderIDFetched;
  corporateIDFetched;
  dataSource: MatTableDataSource<any>;
  positionOptions: TooltipPosition[] = ["below", "above", "left", "right"];
  position = new FormControl(this.positionOptions[1]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;

  private destroy$: Subject<void> = new Subject<void>();
  OrderData: ListUniqueOrdersForCorporateUserData[];
  isadmin;
  currentRoute: string;
  title: string;
  isCorporateUserL1 = false;
  superAdminView: boolean = false;
  user_level;

  constructor(
    private datePipe: DatePipe,
    private menuService: NbMenuService,
    private toastr: ToastrService,
    private service: AuthService,
    public dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  formatDate(date: string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy') || '';
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((val) => {
      this.orderIDFetched = val["id"];
      this.corporateIDFetched = val["cid"];
      let role = sessionStorage.getItem("role");
      this.user_level = sessionStorage.getItem("user_level");

      console.log("user_level from session=",this.user_level);
      console.log("this.orderIDFetched=", this.orderIDFetched);
      console.log("this.corporateIDFetched=", this.corporateIDFetched);
      if (!this.corporateIDFetched) {
        this.superAdminView = false;
        this.getAllUniqueOrders(this.orderIDFetched);
      } else if (this.corporateIDFetched && role == "CORPORATE") {
        this.superAdminView = true;
        this.getAllUniqueOrdersCorporateAdmin(
          this.orderIDFetched,
          this.corporateIDFetched
        );
      } else if (this.corporateIDFetched) {
        this.superAdminView = true;
        this.getAllUniqueOrdersSuperAdmin(
          this.orderIDFetched,
          this.corporateIDFetched
        );
      }
    });
    if (this.router.url.toLowerCase().includes("invoices-l1")) {
      let user_level = sessionStorage.getItem("user_level");
      console.log("global_user_level=", user_level);
      // this.title = "Invoices List for Users of User Level " + user_level;
      this.title = "Invoices";
      if (user_level == "1") {
        this.isCorporateUserL1 = true;
      } else{
        this.isCorporateUserL1 = false;
      }
    }
    // if(!this.isadmin){
    //   this.toastr.warning("User not authorized to view this Page", "Warning");
    //   this.navigateHome();
    // }
  }
  refreshPage(): void {
    location.reload();
  }
  getAllUniqueOrders(orderIDFetched: number) {
    this.service
      .getOrdersByID(orderIDFetched, "/v1/invoice/filter_order_by_orderID/")
      .subscribe(
        (data: ListUniqueOrdersForSuperAdmin) => {
          console.log("Data=", data);
          if (data.code === "200") {
            this.OrderData = data.data;
            console.log("this.OrderData=", this.OrderData);
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
  getAllUniqueOrdersSuperAdmin(
    orderIDFetched: number,
    corporateIDFetched: number
  ) {
    this.service
      .getAdminOrdersByID(
        orderIDFetched,
        corporateIDFetched,
        "/v1/invoice/filter_order_by_orderID_admin/"
      )
      .subscribe(
        (data: ListUniqueOrdersForSuperAdmin) => {
          console.log("Data=", data);
          if (data.code === "200") {
            this.OrderData = data.data;
            console.log("this.OrderData=", this.OrderData);
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
  getAllUniqueOrdersCorporateAdmin(
    orderIDFetched: number,
    corporateIDFetched: number
  ) {
    this.service
      .getAdminOrdersByID(
        orderIDFetched,
        corporateIDFetched,
        "/v1/invoice/filter_order_by_orderID/"
      )
      .subscribe(
        (data: ListUniqueOrdersForCorporateAdmin) => {
          console.log("Data=", data);
          if (data.code === "200") {
            this.OrderData = data.data;
            console.log("this.OrderData=", this.OrderData);
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
  uploadInvoice() {
    console.log("Clicked on Upload Invoice", this.orderIDFetched);
    this.router.navigate(["/pages/add-invoice", this.orderIDFetched]);
  }
  editInvoice(id: number) {
    console.log("Clicked on Edit Invoice", id);
    this.router.navigate(["/pages/update-invoice", id]);
  }
  viewInvoice(id: number) {
    console.log("Clicked on View Invoice", id);
    this.service
      .getInvoiceDocument(id, "/v1/invoice/view_document_invoice/")
      .subscribe(
        (data: ViewInvoiceDocument) => {
          console.log("Data=", data);
          if (data.code === "200") {
            const presignedURL = data.data;
            console.log("Data URL=", presignedURL);
            window.open(presignedURL);
            this.toastr.success(
              "Invoice Downloaded Successfully",
              "Success"
            );
          }
        },
        (error) => {
          console.log(error);
          this.toastr.error("No File Available for Viewing", "Error");
        }
      );
    if (this.superAdminView) {
      this.router.navigate([
        "/pages/invoices-l1",
        this.orderIDFetched,
        this.corporateIDFetched,
      ]);
    } else {
      this.router.navigate(["/pages/invoices-l1", this.orderIDFetched]);
    }
  }
  bulkUpload() {
    console.log("Clicked on Bulk Upload Functionality");    
    this.router.navigate(["/pages/add-invoice", this.orderIDFetched]);
  }
  approveBulkUpload(){
    this.service.approveBulkInvoice(this.orderIDFetched,"/v1/invoice/approove_bulk_invoice/")
    .subscribe({
      next: (response: ApproveBulkUploadResponse) => {
        console.log("Response:", response);
        if (response.code === "200") {
          this.toastr.success(
            "Bulk Upload Approved Successfully",
          );
          this.getAllUniqueOrders(this.orderIDFetched);
        } else if (response.code === "500") {
          this.toastr.error(response.approove_bulk_invoice, "Error");
        } else {
          this.toastr.error("Bulk Upload Approval Failed", "Error");
        }
      },
      error: (error) => {
        console.error("error:", error);
        this.toastr.error("Something went down", "Error");
      },
    });
  }
  approveInvoice(id: number) {
    console.log("Clicked on Approve Invoice", id);
    this.service.approveOrRejectInvoice(id,"/v1/invoice/approove_document_invoice/").subscribe(
      (res: ApproveInvoice) => {
        console.log("Data=",res);
        if (res.code === "200") {
          this.toastr.success(
            "Invoice Approved Successfully",
            "Success"
          );
          this.getAllUniqueOrders(this.orderIDFetched);
        } else if (res.code === "500") {
          this.toastr.error(res.approve_document_invoice, "Error");
        } else {
          this.toastr.error("Contact Admin for more Info", "Error");
        }
      },
      (error) => {
        console.log(error);
        this.toastr.error("Something went down", "Error");
      }
    );
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
