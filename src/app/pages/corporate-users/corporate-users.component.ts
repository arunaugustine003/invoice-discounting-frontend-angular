import { Component, DoCheck, OnDestroy, OnInit, ViewChild } from "@angular/core";
import {
  NbMenuService,
} from "@nebular/theme";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { Corporate, CorporateData, CorporateUser } from "../../interfaces/corporateList";
import { MatDialog } from "@angular/material/dialog";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from "@angular/router";
import Swal from 'sweetalert2';


@Component({
  selector: "ngx-corporate-users",
  templateUrl: "./corporate-users.component.html",
  styleUrls: ["./corporate-users.component.scss"],
})
export class CorporateUsersComponent implements OnInit, DoCheck, OnDestroy {
  displayedColumns: string[] = ['corporateUserGroupID','userName','userContact','userEmail'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private destroy$: Subject<void> = new Subject<void>();
  corporateData: CorporateUser[];
  isadmin = false;
  private userIdToUpdate!: number;

  constructor(
    private service: AuthService,
    private menuService:NbMenuService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllCorporateUsers();

    this.activatedRoute.params.subscribe((val) => {
      this.userIdToUpdate = val["id"];
      if (this.userIdToUpdate) {
        this.service
          .getCorporateByID(
            this.userIdToUpdate,
            "/v1/corporate/list_corporate_individual/?corporateID="
          )
          .subscribe({
            next: (res) => {
              console.log("res.data=",res.data);
            },
            error: (err) => {
              console.log(err);
            },
          });
      }
    });
  }

  getAllCorporateUsers(){
    this.service.getCorporateData("/v1/corporate/list_corporates/").subscribe(
      (data: any) => {
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
  routeAddCorporateUser(){
    this.router.navigate(['/pages/add-corporate-user']);
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
