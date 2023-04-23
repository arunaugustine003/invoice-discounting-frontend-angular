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
import { ListUniqueOrdersForCorporateUser, ListUniqueOrdersForCorporateUserData } from "../../../interfaces/orderList";
import { ViewInvoiceDocument } from "../../../interfaces/invoiceList";

@Component({
  selector: 'ngx-invoices-l1',
  templateUrl: './invoices-l1.component.html',
  styleUrls: ['./invoices-l1.component.scss']
})
export class InvoicesL1Component implements OnInit, OnDestroy {
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
  currentRoute: string;
  title: string;


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
    if (this.router.url.toLowerCase().includes("invoices-l1")) {
      this.title="Invoices List for L1 User";
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
  uploadInvoice(id: number) {
    console.log("Clicked on Upload Invoice", id);
    this.router.navigate(["/pages/add-invoice", id]);
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
