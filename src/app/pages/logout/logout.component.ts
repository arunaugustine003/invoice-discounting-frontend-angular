import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NbDialogService } from "@nebular/theme";
import { AuthService } from "../../services/auth.service";
import { ShowcaseDialogComponent } from "../modal-overlays/dialog/showcase-dialog/showcase-dialog.component";
import Swal from "sweetalert2";

@Component({
  selector: "ngx-logout",
  templateUrl: "./logout.component.html",
  styleUrls: ["./logout.component.scss"],
})
export class LogoutComponent implements OnInit {
  constructor(
    private service: AuthService,
    private dialogService: NbDialogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.openSwalFire();
  }
  openSwalFire() {
      Swal.fire({
        title: "Are you sure you want to Logout?",
        text: "You will be Logged out of this Application!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Logout !",
      }).then((result) => {
        if (result.isConfirmed) {
          sessionStorage.clear();
          this.router.navigate(["/login"]);
        } else {
          console.log("You Clicked No");
          this.router.navigate(["/pages/dashboard"]);  
        }
      });
  }
}
