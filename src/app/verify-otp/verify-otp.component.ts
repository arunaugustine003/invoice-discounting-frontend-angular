import {
  Component,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  Renderer2,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { timer } from "rxjs";
import { switchMap } from "rxjs/operators";
import { IVerifyLoginResponse } from "../interfaces/verifyResponse";
import { IVerifyOtpResponse } from "../interfaces/verifyResponse";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "ngx-verify-otp",
  templateUrl: "./verify-otp.component.html",
  styleUrls: ["./verify-otp.component.scss"],
})
export class VerifyOtpComponent implements OnInit, OnDestroy {
  otpFormControl = new FormControl();
  otpVerified: boolean = false;
  otpBtnText = "Verify OTP";
  showOTPLoader: boolean = false;
  showResendOTP = false;
  remainingTimeGlobal: number;
  email: string;
  otpResendInterval = 120 * 1000; // in milliseconds
  private otpResendTime = Date.now() + this.otpResendInterval; // calculate the time when the OTP can be resent

  constructor(
    private service: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.email = this.service.getEmail();
    console.log("email=", this.email);
    // Enable the resend OTP link after 60 seconds
    timer(this.otpResendInterval)
      .pipe(
        switchMap(() => {
          this.showResendOTP = true;
          return this.otpFormControl.valueChanges;
        })
      )
      .subscribe(() => {
        // Hide the resend OTP link if the OTP input value changes
        this.showResendOTP = false;
      });

    // call the displayRemainingTime function at regular intervals to update the remaining time
    setInterval(() => {
      this.displayRemainingTime();
    }, 1000); // update every second
    this.renderer.addClass(document.body, "verify-otp-page");
  }
  ngOnDestroy() {
    this.renderer.removeClass(document.body, "verify-otp-page");
  }
  // function to calculate and display the remaining time
  private displayRemainingTime() {
    const remainingTime = this.otpResendTime - Date.now(); // calculate remaining time in milliseconds
    if (remainingTime > 0) {
      this.remainingTimeGlobal = Math.round(remainingTime / 1000);
    } else {
      this.showResendOTP = true;
    }
  }
  verifyOTP() {
    console.log("this.otpFormControl.value", this.otpFormControl.value);
    if (this.otpFormControl.value) {
      if (this.otpFormControl.value.length == 6) {
        this.showOTPLoader = true;
        this.otpBtnText = "Verifying..";
        const data = {
          email: this.email,
          otp: this.otpFormControl.value.toString(),
        };
        this.service.post(data, "/v1/security/otp_verify").subscribe(
          (response: IVerifyOtpResponse) => {
            console.log("response=", response);
            if (response.code === "200") {
              this.showOTPLoader = false;
              this.otpVerified = true;
              const token = response.data.token;
              sessionStorage.setItem("token", token);
              sessionStorage.setItem("role", response.data.user_type);
              
              let user_level: number = 0;
              let s_corporateID: number = 0;
             
              if (response.data.user_level === null) {
                user_level = 0;
              } else {
                user_level = response.data.user_level;
              }
              sessionStorage.setItem("user_level", user_level.toString());

              if (response.data.user_id === null) {
                s_corporateID = 0;
              } else {
                s_corporateID = response.data.user_id;
              }
              sessionStorage.setItem("corporateID", JSON.stringify(s_corporateID));
              console.log(sessionStorage.getItem("corporateID")) ;
              
              this.router.navigate(["pages/dashboard"]);
            } else if (response.code === "500") {
              this.showOTPLoader = false;
              this.otpBtnText = "Verify OTP";
              this.toastr.error(response.msg, "Error");
            } else {
              this.showOTPLoader = false;
              this.otpBtnText = "Verify OTP";
              this.toastr.error("Contact Admin for more Info", "Error");
            }
          },
          (error) => {
            this.showOTPLoader = false;
            this.otpBtnText = "Verify OTP";
            console.error("Login error:", error);
            this.toastr.error("Something went down", "Error");
          }
        );
      } else {
        this.toastr.warning("OTP must be 6 letters long", "Warning");
      }
    } else {
      this.toastr.warning("OTP Not Entered", "Warning");
    }
  }

  resendOTP(): void {
    if (this.showOTPLoader || !this.showResendOTP) {
      return;
    }
    this.showResendOTP = false;
    // Reset the otpResendTime variable to a new time that is otpResendInterval milliseconds in the future
    this.otpResendTime = Date.now() + this.otpResendInterval;
    const data = {
      email: this.email,
    };
    console.log("Data = ", data);
    this.service.post(data, "/v1/security/login").subscribe({
      next: (response: IVerifyLoginResponse) => {
        console.log("Login response:", response);
        if (response.code === "200") {
          this.toastr.success("OTP resent successfully", "Success");
          this.otpBtnText = "Verify OTP";
        }
        if (response.code === "500") {
          this.toastr.error(response.txt, "Error");
        }
      },
      error: (error) => {
        console.error("Login error:", error);
        this.toastr.error("Please contact Admin", "Error");
      },
    });
    // Call the displayRemainingTime function to update the remaining time
    this.displayRemainingTime();
  }
  @HostListener("document:keydown.enter", ["$event"]) onKeydownHandler(
    event: KeyboardEvent
  ) {
    this.verifyOTP();
  }
}
