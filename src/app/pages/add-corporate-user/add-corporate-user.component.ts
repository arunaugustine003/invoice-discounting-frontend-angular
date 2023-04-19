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
import {
  IVerifyCreateCorporateResponse,
  IVerifyCreateCorporateUserResponse,
} from "../../interfaces/verifyResponse";
import {
  Corporate,
  CorporateUserDetails,
} from "../../interfaces/corporateList";
interface Food {
  name: string;
}

@Component({
  selector: "ngx-add-corporate-user",
  templateUrl: "./add-corporate-user.component.html",
  styleUrls: ["./add-corporate-user.component.scss"],
})
export class AddCorporateUserComponent implements OnInit {
  corporateUserForm!: FormGroup;
  private userIdToUpdate!: number;
  corporateUserGroupIDArrays: [];
  public isUpdateActive: boolean = false;

  selectedValue: string;
  selectedCar: string;

  // foods: Food[] = [{ name: "one" }, { name: "two" }];
  foods = [
    {
        "corporateID": 1,
        "corporateUserGroupLevel": 1,
        "corporateUserGroupCreatedOn": "18-04-2023, 11:42:48 AM",
        "corporateUserGroupName": "one",
        "corporateUserGroupID": 1,
        "corporateUserGroupStatus": 1
    },
    {
        "corporateID": 1,
        "corporateUserGroupLevel": 2,
        "corporateUserGroupCreatedOn": "18-04-2023, 11:42:48 AM",
        "corporateUserGroupName": "two",
        "corporateUserGroupID": 2,
        "corporateUserGroupStatus": 1
    }
];

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private service: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    console.log("Selected food: ", this.selectedValue);
    this.corporateUserForm = this.formBuilder.group({
      selectedValue: ["", Validators.required],
      corporateUserGroupID: ["", Validators.required],
      name: ["", Validators.required],
      contactNo: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
    });
    this.activatedRoute.params.subscribe((val) => {
      this.userIdToUpdate = val["id"];
      console.log("this.userIdToUpdate=", this.userIdToUpdate);
      if (this.userIdToUpdate) {
        this.service
          .getUserByID(
            this.userIdToUpdate,
            "/v1/users/get_single_user/?userID="
          )
          .subscribe({
            next: (res) => {
              console.log("get_single_user res.data[0]=", res.data[0]);
              this.getCorporateUserGroupNames(res.data[0].corporateID);
              this.fillFormToUpdate(
                res.data[0],
                this.getCorporateUserGroupNames(res.data[0].corporateID)
              );
            },
            error: (err) => {
              console.log(err);
            },
          });
      }
    });
  }
  getCorporateUserGroupNames(corporateID: number) {
    this.service
      .getListCorporateUserGroup(
        corporateID,
        "/v1/corporate/list_corporate_user_group/"
      )
      .subscribe({
        next: (res) => {
          // console.log(
          //   "list_corporate_individual Group Names res.data[0]=",
          //   res.data[0].corporateUserGroupNames
          // );
          console.log("res.data=",res.data);
          return res.data;
        },
        error: (err) => {
          console.log(err);
          return;
        },
      });
  }
  fillFormToUpdate(
    corporate: CorporateUserDetails,
    corporateUserGroupIDArrays
  ) {
    console.log("corporateUserGroupIDArrays=", corporateUserGroupIDArrays);
    setTimeout(() => {
      this.corporateUserForm.setValue({
        // corporateUserGroupID: corporateUserGroupIDArrays,
        corporateUserGroupID: this.foods["corporateID"],
        selectedValue: "steak-0",
        name: corporate.userName,
        contactNo: corporate.userContact,
        email: corporate.userEmail,
      });
    }, 1000);
  }
  addCorporateUser() {
    const data = {
      selectedValue: this.corporateUserForm.value.selectedValue,
      corporateUserGroupID: this.corporateUserForm.value.corporateUserGroupID,
      userName: this.corporateUserForm.value.name,
      userContact: this.corporateUserForm.value.contactNo,
      userEmail: this.corporateUserForm.value.email,
    };
    if (this.corporateUserForm.valid) {
      console.log("Data=", data);
      this.service.post(data, "/v1/users/create_user/").subscribe({
        next: (response: IVerifyCreateCorporateUserResponse) => {
          console.log("Response:", response);
          if (response.code === "200") {
            this.toastr.success(
              "Corporate User Added Successfully",
              "Success 🐱‍🏍"
            );
            this.corporateUserForm.reset();
            this.router.navigate([
              "/pages/corporate-users",
              this.userIdToUpdate,
            ]);
          } else if (response.code === "500") {
            this.toastr.error(response.create_user, "Error ❌");
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
  updateCorporateUser() {
    const data = {
      corporateUserGroupID: "hello",
      userName: this.corporateUserForm.value.name,
      userContact: this.corporateUserForm.value.contactNo,
      userEmail: this.corporateUserForm.value.email,
    };
    if (this.corporateUserForm.valid) {
      console.log("Data=", data);
      this.service
        .updateCorporate(data, "/v1/users/update_single_user")
        .subscribe({
          next: (response: IVerifyCreateCorporateResponse) => {
            console.log("Response:", response);
            if (response.code === "200") {
              this.toastr.success(
                "Corporate User Added Successfully",
                "Success 🐱‍🏍"
              );
              this.corporateUserForm.reset();
              this.router.navigate([
                "/pages/corporate-users",
                this.userIdToUpdate,
              ]);
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
    this.router.navigate(["/pages/corporate-users"]);
  }
}
