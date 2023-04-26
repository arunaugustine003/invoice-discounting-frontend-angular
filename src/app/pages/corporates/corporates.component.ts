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
@Component({
  selector: "ngx-corporates",
  templateUrl: "./corporates.component.html",
  styleUrls: ["./corporates.component.scss"],
})
export class CorporatesComponent implements OnInit, DoCheck, OnDestroy {
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
    "corporateID",
    "FullName",
    "corporateEmail",
    "corporateAddress",
    "corporateContact",
    "corporateUserGroupLevels",
    "corporateUserGroupNames",
    "action",
  ];
  dataSource: MatTableDataSource<any>;
  positionOptions: TooltipPosition[] = ["below", "above", "left", "right"];
  position = new FormControl(this.positionOptions[1]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private destroy$: Subject<void> = new Subject<void>();
  corporateData: Corporate[];
  isAdmin = false;
  constructor(
    private menuService: NbMenuService,
    private toastr: ToastrService,
    private service: AuthService,
    public dialog: MatDialog,
    private router: Router
  ) {
    let role = sessionStorage.getItem("role");
    if (role == "ADMIN") {
      this.isAdmin = true;
    }
  }
  async ngOnInit(): Promise<void> {
    // if(!this.isAdmin){
    //   this.toastr.warning("User not authorized to view this Page", "Warning");
    //   this.navigateHome();
    // }
    try {
      const data = await this.service
        .getPaginatedList(0, 2, "/v1/corporate/list_corporates/")
        .toPromise();
      if (data.code === "200") {
        this.totalRecordCount = data.Total_count;
        await this.getAllCorporates();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getAllCorporates(): Promise<void> {
    try {
      const data = await this.service
        .getPaginatedList(
          0,
          this.totalRecordCount,
          "/v1/corporate/list_corporates/"
        )
        .toPromise();
      if (data.code === "200") {
        this.corporateData = data.data;
        const activeCorporates: any[] = [];
        const inActiveCorporates: any[] = [];
        this.corporateData.map((x: Corporate) => {
          if (x.corporateStatus == 1) {
            activeCorporates.push(x);
          } else if (x.corporateStatus == 0) {
            inActiveCorporates.push(x);
          }
        });
        console.log("activeCorporates", activeCorporates);
        console.log("InActiveCorporates", inActiveCorporates);
        this.dataSource = new MatTableDataSource(activeCorporates);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    } catch (error) {
      console.log(error);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  routeAddCorporate() {
    this.router.navigate(["/pages/add-corporate"]);
  }
  viewCorporateUsers(id: number) {
    console.log("Clicked on Corporate Users", id);
    this.router.navigate(["/pages/corporate-users", id]);
  }
  viewLinkedVendors(id: number) {
    console.log("Clicked on View Linked Vendors", id);
    this.router.navigate(["/pages/place-order", id]);
  }
  editCorporate(id: number) {
    console.log("Clicked on Edit Corporate", id);
    this.router.navigate(["/pages/update-corporate", id]);
  }

  deleteCorporate(id: number) {
    Swal.fire({
      title: "Are you sure want to Delete?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        //your logic if Yes clicked
        this.service
          .deleteCorporate(id, "/v1/corporate/change_status_corporate/")
          .subscribe({
            next: (res) => {
              Swal.fire(
                "Deleted!",
                "Corporate Record has now been deleted",
                "success"
              );
              console.log("response=", res);
              this.getAllCorporates();
            },
            error: (err) => {
              this.toastr.error(err, "Error ❌");
            },
          });
      } else {
        console.log("You Clicked No");
        this.router.navigate(["/pages/corporates"]);
      }
    });
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
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }
}
