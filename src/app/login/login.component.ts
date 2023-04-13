import { Component, OnDestroy, OnInit, Renderer2} from "@angular/core";
import {
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { IVerifyLoginResponse} from "../interfaces/verifyResponse";
import { AuthService } from "../services/auth.service";
@Component({
  selector: "ngx-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit,OnDestroy {
  public loginForm!: FormGroup;
  constructor(
    private service: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private renderer: Renderer2,
  ){
    sessionStorage.clear();
  }  
  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
    });
    this.renderer.addClass(document.body, 'login-page');
  }
  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'login-page');
  }  
  get email() {
    return this.loginForm.get("email");
  }
  login() {
    if (this.loginForm.valid) {
      const data = this.loginForm.value;
      console.log("Data = ", data);
      this.service.post(data,"/v1/security/login").subscribe({
        next: (response:IVerifyLoginResponse) => {
          console.log("Login response:", response);
          if (response.code === "200") {
          this.toastr.success("Login Successful", "Success 🐱‍🏍");
          this.service.email = data.email;
          this.loginForm.reset();
          sessionStorage.setItem('usermail',this.service.email);
          sessionStorage.setItem('role','admin');
          this.router.navigate(["/verify-otp"]);
          }
          else if (response.code === "500") {
          this.toastr.error(response.txt, "Error ❌");
          }
           else{
          this.toastr.error("Contact Admin for more Info", "Error ❌");
          }
        },
        error: (error) => {
          console.error("Login error:", error);
          this.toastr.error("Something went down", "Error ❌");
        },
      });
    } else {
      this.toastr.warning("Please enter Valid Data", "Warning");
    }
  }
}
