import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";

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
        next: (res) => {
          alert("Vendor Added Successfully");
          console.log("Vendor Added Successfully", res);
          this.vendorForm.reset();
        },
        error: (err) => {
          alert("Vendor not Added");
          console.log(err);
        },
      });
    }
  }  
}
