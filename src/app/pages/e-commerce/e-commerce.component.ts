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
    }

}
