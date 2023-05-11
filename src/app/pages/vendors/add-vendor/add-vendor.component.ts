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
import { CreateVendorResponse, Vendor } from "../../../interfaces/vendorList";
@Component({
  selector: "ngx-add-vendor",
  templateUrl: "./add-vendor.component.html",
  styleUrls: ["./add-vendor.component.scss"],
})
export class AddVendorComponent implements OnInit {
  vendorForm!: FormGroup;
  VendorData: Vendor[];

  constructor(
    private formBuilder: FormBuilder,
    private service: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.vendorForm = this.formBuilder.group({
      name: ["", Validators.required],
      address: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      contactNo: ["", Validators.required],
    });
    this.getAllVendors();
  }
  getAllVendors() {
    this.service.getPaginatedList(0, 5, "/v1/vendor/list_vendors/").subscribe({
      next: (response: any) => {
        console.log("Response:", response);
        if (response.code === "200") {
          this.VendorData = response.data;
          console.log("this.VendorData=", this.VendorData);
        } else {
          return;
        }
      },
      error: (error) => {
        console.error("error:", error);
      },
    });
  }
  addVendor() {
    console.log("Final Form Value", this.vendorForm.value);
    const data = {
      vendorName: this.vendorForm.value.name,
      vendorAddress: this.vendorForm.value.address,
      vendorEmail: this.vendorForm.value.email,
      vendorContact: this.vendorForm.value.contactNo,
    };
    const currentVendorName = data.vendorName; // change this to your current vendor name
   
    let vendorExists = false;
    for (const vendor of this.VendorData) {
      if (vendor.vendorName === currentVendorName) {
        vendorExists = true;
        break;
      }
    }
    if (vendorExists === true) {
      this.toastr.error(
        "Vendor Already Exists, Please add another Vendor Name",
        "Error"
      );
    this.router.navigate(["/pages/add-vendor"]);
    } else if (this.vendorForm.valid && vendorExists === false) {
      console.log("Data=", data);
      this.service.post(data, "/v1/vendor/add_vendor/").subscribe({
        next: (response: CreateVendorResponse) => {
          console.log("Response:", response);
          if (response.code === "200") {
            this.toastr.success("Vendor Added Successfully", "Success");
            this.vendorForm.reset();
            this.router.navigate(["/pages/vendors"]);
          } else if (response.code === "500") {
            this.toastr.error(response.add_vendor, "Error");
          } else {
            this.toastr.error("Contact Admin for more Info", "Error");
          }
        },
        error: (err) => {
          alert("Vendor not Added");
          console.log(err);
        },
      });
    }
    else{
      return;
    }
  }
  closeVendor(){
    this.router.navigate(["/pages/vendors"]);
  }
}
