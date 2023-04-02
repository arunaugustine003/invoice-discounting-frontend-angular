import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NbDialogService } from "@nebular/theme";
import { AuthService } from "../../services/auth.service";
import { ShowcaseDialogComponent } from "../modal-overlays/dialog/showcase-dialog/showcase-dialog.component";

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
    this.open();
  }
  open() {
    this.dialogService
      .open(ShowcaseDialogComponent, {
        context: {
          title: "Logout",
          body: "Are you sure you want to logout?",
        },
      })
      .onClose.subscribe(() => {
        this.router.navigate(["/dashboard"]);
      });
  }
}
