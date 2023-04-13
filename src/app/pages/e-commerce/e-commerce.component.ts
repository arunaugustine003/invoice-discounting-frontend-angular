import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "ngx-ecommerce",
  templateUrl: "./e-commerce.component.html",
})
export class ECommerceComponent implements OnInit {
  constructor(
    private service: AuthService,
    ) {}
    data:any;
    ngOnInit(): void {
      console.log("Hello");
      this.getCurrentUser();
    }
    getCurrentUser() {
    this.service.post(this.data,"/v1/current_user/get_current_user/").subscribe({
      next: (res) => {
        console.log("Current User got Successfully", res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
