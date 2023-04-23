import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
} from "@angular/forms";
import { AuthService } from "../../../services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { IVerifyCreateVendorResponse } from "../../../interfaces/verifyResponse";
import { Vendor } from "../../../interfaces/vendorList";
@Component({
  selector: 'ngx-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.scss']
})
export class AddVendorComponent implements OnInit {

  vendorForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.vendorForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNo: ['', Validators.required],
    });
  }
  addVendor() {
    console.log("Final Form Value",this.vendorForm.value);
    const data = {
      vendorName: this.vendorForm.value.name,
      vendorAddress: this.vendorForm.value.address,
      vendorEmail: this.vendorForm.value.email,
      vendorContact: this.vendorForm.value.contactNo,
    };
    if (this.vendorForm.valid) {
      console.log("Data=",data);
      this.service.post(data, "/v1/vendor/add_vendor/").subscribe({
        next: (response: IVerifyCreateVendorResponse) => {
          console.log("Response:", response);
          if (response.code === "200") {
            this.toastr.success("Vendor Added Successfully", "Success 🐱‍🏍");
            this.vendorForm.reset();
            this.router.navigate(["/pages/vendors"]);
          } else if (response.code === "500") {
            this.toastr.error(response.create_vendor, "Error ❌");
          } else {
            this.toastr.error("Contact Admin for more Info", "Error ❌");
          }
        },
        error: (err) => {
          alert("Vendor not Added");
          console.log(err);
        },
      });
    }
  }  
}
