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
  ListCorporateUserGroupBynameResponse,
} from "../../interfaces/corporateList";

@Component({
  selector: "ngx-add-corporate-user",
  templateUrl: "./add-corporate-user.component.html",
  styleUrls: ["./add-corporate-user.component.scss"],
})
export class AddCorporateUserComponent implements OnInit {
  corporateUserForm!: FormGroup;
  corporateForm!: FormGroup;

  message: string;
  private userIdToUpdate!: number;
  public isUpdateActive: boolean = false;
  corporateGlobal;
  corporateIDGlobal;
  corporateUserGroupID: string;
  corporateUserGroupIDArrays: [];
  corporateUserGroupIDResData;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private service: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  async ngOnInit(): Promise<void> {
    this.corporateUserForm = this.formBuilder.group({
      corporateUserGroupID: ["", Validators.required],
      name: ["", Validators.required],
      contactNo: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
    });

    await this.activatedRoute.params.subscribe(async (val) => {
      this.userIdToUpdate = val["id"];
      console.log("this.userIdToUpdate=", this.userIdToUpdate);
      if (this.userIdToUpdate) {
        const res = await this.service
          .getUserByID(
            this.userIdToUpdate,
            "/v1/users/get_single_user/?userID="
          )
          .toPromise();
        this.corporateGlobal = res.data[0];
        this.corporateIDGlobal = res.data[0].corporateID;
        console.log(
          "get_single_user this.corporateIDGlobal=",
          this.corporateIDGlobal
        );
      }
      await this.getCorporateUserGroupNames(this.corporateIDGlobal);
      if (this.service.isEditClicked) {
        this.message = "Edit Corporate User";
        this.fillFormToUpdate(
          this.corporateGlobal,
          this.corporateUserGroupIDArrays
        );
      } else {
        this.message = "Add Corporate User";
      }
    });
  }

  async getCorporateUserGroupNames(corporateID: number): Promise<void> {
    try {
      const res = await this.service
        .getListCorporateUserGroup(
          corporateID,
          "/v1/corporate/list_corporate_user_group/"
        )
        .toPromise();
      console.log("res.data=", res.data);
      this.corporateUserGroupIDArrays = res.data;
    } catch (error) {
      console.log("Error loading albums", error);
    }
  }

  fillFormToUpdate(
    corporate: CorporateUserDetails,
    corporateUserGroupIDArrays
  ) {
    console.log(
      "corporateUserGroupIDArrays[0].corporateUserGroupName=",
      corporateUserGroupIDArrays[0].corporateUserGroupName
    );
    this.corporateUserForm.setValue({
      corporateUserGroupID:
        corporateUserGroupIDArrays[0].corporateUserGroupName,
      name: corporate.userName,
      contactNo: corporate.userContact,
      email: corporate.userEmail,
    });
  }
  async getCorporateUserIDByCorporateUserName(id: number, name: string) {
    const data = {
      corporateID: id,
      name: name,
    };
    try {
      const response = (await this.service
        .post(data, "/v1/corporate/list_corporate_user_group_byname/")
        .toPromise()) as ListCorporateUserGroupBynameResponse;
      console.log("Response Data:", response.data);
      if (response.code === "200") {
        this.toastr.success(
          "Corporate User ID Got Successfully",
          "Success 🐱‍🏍"
        );
        this.corporateUserGroupIDResData = response.data.corporateUserGroupID;
      } else if (response.code === "500") {
        this.toastr.error(response.list_corporate_user_group, "Error ❌");
      } else {
        this.toastr.error("Contact Admin for more Info", "Error ❌");
      }
    } catch (error) {
      console.error("error:", error);
      this.toastr.error("Something went down", "Error ❌");
    }
  }

  async addCorporateUser() {
    await this.getCorporateUserIDByCorporateUserName(
      this.corporateIDGlobal,
      this.corporateUserForm.value.corporateUserGroupID
    );
    const data = {
      corporateUserGroupID: this.corporateUserGroupIDResData,
      userName: this.corporateUserForm.value.name,
      userContact: this.corporateUserForm.value.contactNo,
      userEmail: this.corporateUserForm.value.email,
    };
    if (this.corporateUserForm.valid) {
      console.log("Data=", data);
      try {
        const response = (await this.service
          .post(data, "/v1/users/create_user/")
          .toPromise()) as IVerifyCreateCorporateUserResponse;
        console.log("Response:", response);
        if (response.code === "200") {
          this.toastr.success(
            "Corporate User Added Successfully",
            "Success 🐱‍🏍"
          );
          this.corporateUserForm.reset();
          this.router.navigate(["/pages/corporate-users", this.userIdToUpdate]);
        } else if (response.code === "500") {
          this.toastr.error(response.create_user, "Error ❌");
        } else {
          this.toastr.error("Contact Admin for more Info", "Error ❌");
        }
      } catch (error) {
        console.error("error:", error);
        this.toastr.error("Something went down", "Error ❌");
      }
    } else {
      this.toastr.warning("Please enter Valid Data", "Warning");
    }
  }

  async updateCorporateUser() {
    await this.getCorporateUserIDByCorporateUserName(
      this.corporateIDGlobal,
      this.corporateUserForm.value.corporateUserGroupID
    );
    const data = {
      corporateUserGroupID: this.corporateUserGroupIDResData,
      userName: this.corporateUserForm.value.name,
      userContact: this.corporateUserForm.value.contactNo,
      userEmail: this.corporateUserForm.value.email,
    };
    if (this.corporateUserForm.valid) {
      console.log("Data=", data);
      try {
        const response = (await this.service
          .updateCorporate(data, "/v1/users/update_single_user/")
          .toPromise()) as IVerifyCreateCorporateUserResponse;
        console.log("Response:", response);
        if (response.code === "200") {
          this.toastr.success(
            "Corporate User Updated Successfully",
            "Success 🐱‍🏍"
          );
          this.corporateUserForm.reset();
          console.log("this.corporateIDGlobal=",this.corporateIDGlobal);
          this.router.navigate(["/pages/corporate-users", this.corporateIDGlobal]);
        } else if (response.code === "500") {
          this.toastr.error(response.create_user, "Error ❌");
        } else {
          this.toastr.error("Contact Admin for more Info", "Error ❌");
        }
      } catch (error) {
        console.error("error:", error);
        this.toastr.error("Something went down", "Error ❌");
      }
    } else {
      this.toastr.warning("Please enter Valid Data", "Warning");
    }
  }

  closeCorporateUser() {
    this.router.navigate(["/pages/corporate-users"]);
  }
}
