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
import {
  CorporateUserDetails,
  CorporateUserList,
} from "../../interfaces/corporateList";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { TooltipPosition } from "@angular/material/tooltip";
import { FormControl } from "@angular/forms";
@Component({
  selector: "ngx-corporate-users",
  templateUrl: "./corporate-users.component.html",
  styleUrls: ["./corporate-users.component.scss"],
})
export class CorporateUsersComponent implements OnInit, DoCheck, OnDestroy {
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
    "userID",
    "corporateUserGroupID",
    "userName",
    "userContact",
    "userEmail",
    "action",
  ];
  dataSource: MatTableDataSource<any>;
  positionOptions: TooltipPosition[] = ["below", "above", "left", "right"];
  position = new FormControl(this.positionOptions[1]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private destroy$: Subject<void> = new Subject<void>();
  corporateUserData: CorporateUserDetails[];
  isadmin = false;
  private userIdToUpdate!: number;

  constructor(
    private service: AuthService,
    private menuService: NbMenuService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  async ngOnInit(): Promise<void> {
    // if(!this.isAdmin){
    //   this.toastr.warning("User not authorized to view this Page", "Warning");
    //   this.navigateHome();
    // }
    this.activatedRoute.params.subscribe((val) => {
      this.userIdToUpdate = val["id"];
      console.log("this.userIdToUpdate=", this.userIdToUpdate);
      this.getAllCorporateUsers();
    });
    try {
      if (this.userIdToUpdate !== undefined) {
        const data = await this.service
          .getCorporateLinked(0, 5, this.userIdToUpdate, "/v1/users/get_users/")
          .toPromise();
        if (data.code === "200") {
          this.totalRecordCount = data.Total_count;
          await this.getAllCorporateUsers();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getAllCorporateUsers(): Promise<void> {
    try {
      const data = await this.service
        .getCorporateLinked(0, 5, this.userIdToUpdate, "/v1/users/get_users/")
        .toPromise();
      if (data.code === "200") {
        this.corporateUserData = data.data;
        console.log("this.corporateUserData=", this.corporateUserData);
        const activeCorporateUsers: any[] = [];
        const inActiveCorporateUsers: any[] = [];
        this.corporateUserData.map((x: CorporateUserDetails) => {
          if (x.userStatus == 1) {
            activeCorporateUsers.push(x);
          } else if (x.userStatus == 0) {
            inActiveCorporateUsers.push(x);
          }
        });
        console.log("activeCorporates", activeCorporateUsers);
        console.log("InActiveCorporates", inActiveCorporateUsers);
        this.dataSource = new MatTableDataSource(activeCorporateUsers);
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
  routeAddCorporateUser() {
    this.service.isEditClicked = false;
    this.router.navigate(["/pages/add-corporate-user", this.userIdToUpdate]);
  }
  editCorporateUser(id: number) {
    console.log("Clicked on Edit Corporate User", id);
    this.service.isEditClicked = true;
    this.router.navigate(["/pages/update-corporate-user", id]);
  }

  deleteCorporateUser(id: number) {
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
          .deleteCorporateUser(id, "/v1/users/change_status_user/")
          .subscribe({
            next: (res) => {
              Swal.fire(
                "Deleted!",
                "Corporate Record has now been deleted",
                "success"
              );
              console.log("response=", res);
              this.getAllCorporateUsers();
            },
            error: (err) => {
              this.toastr.error(err, "Error ❌");
            },
          });
      } else {
        console.log("You Clicked No");
        this.router.navigate(["/pages/corporate-users", id]);
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
      this.isadmin = true;
    } else {
      this.isadmin = false;
    }
  }
}
