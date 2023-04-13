import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
} from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { IVerifyCreateCorporateResponse } from "../../interfaces/verifyResponse";
import { Corporate } from "../../interfaces/corporateList";

@Component({
  selector: 'ngx-add-corporate-user',
  templateUrl: './add-corporate-user.component.html',
  styleUrls: ['./add-corporate-user.component.scss']
})
export class AddCorporateUserComponent implements OnInit {
  corporateForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.corporateForm = this.formBuilder.group({
      corporateUserGroupID: ["", Validators.required],
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      contactNo: ["", Validators.required],
    });
  }
  fillFormToUpdate(corporate: Corporate) {
    this.corporateForm.setValue({
      name:corporate.corporateName,
      email:corporate.corporateEmail,
      address:corporate.corporateAddress,
      contactNo:corporate.corporateContact,
      userGroupLevels:corporate.corporateUserGroupLevels,
      userGroupNames:corporate.corporateUserGroupNames,
    })
  }
  addCorporateUser() {
    const data = {
      corporateName: this.corporateForm.value.name,
      corporateAddress: this.corporateForm.value.address,
      corporateEmail: this.corporateForm.value.email,
      corporateContact: this.corporateForm.value.contactNo,
    };
    if (this.corporateForm.valid) {
      console.log("Data=", data);
      this.service.post(data, "/v1/corporate/create_corporate/").subscribe({
        next: (response: IVerifyCreateCorporateResponse) => {
          console.log("Response:", response);
          if (response.code === "200") {
            this.toastr.success("Corporate Added Successfully", "Success 🐱‍🏍");
            this.corporateForm.reset();
            this.router.navigate(["/pages/corporates"]);
          } else if (response.code === "500") {
            this.toastr.error(response.create_corporate, "Error ❌");
          } else {
            this.toastr.error("Contact Admin for more Info", "Error ❌");
          }
        },
        error: (error) => {
          console.error("error:", error);
          this.toastr.error("Something went down", "Error ❌");
        },
      });
    } else {
      this.toastr.warning("Please enter Valid Data", "Warning");
    }
  }  
  closeCorporateUser() {
    this.router.navigate(["/pages/corporates"]);
  }

}
