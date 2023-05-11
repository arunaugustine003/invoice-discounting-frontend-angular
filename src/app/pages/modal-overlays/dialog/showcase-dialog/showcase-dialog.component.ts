import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { NbDialogRef } from "@nebular/theme";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../../../../services/auth.service";

@Component({
  selector: "ngx-showcase-dialog",
  templateUrl: "showcase-dialog.component.html",
  styleUrls: ["showcase-dialog.component.scss"],
})
export class ShowcaseDialogComponent {
  @Input() title: string;
  @Input() body: string;

  constructor(
    private toastr: ToastrService,
    private service: AuthService,
    protected ref: NbDialogRef<ShowcaseDialogComponent>,
    private router: Router
  ) {}

  dismiss() {
    this.ref.close();
  }
  async logoutAndRedirect(): Promise<void> {
    try {
      await this.service.logout().toPromise();
      this.toastr.success("Logout Successful", "Success");
      this.router.navigate(["/login"]);
      await new Promise((resolve) => setTimeout(resolve, 100));
      window.location.reload();
    } catch (error) {
      console.error(error);
      this.ref.close();
    }
  }
  
}
