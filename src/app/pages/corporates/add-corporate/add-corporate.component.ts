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
import { IVerifyCreateCorporateResponse } from "../../../interfaces/verifyResponse";
import {
  Corporate,
  CorporateUserGroupName,
} from "../../../interfaces/corporateList";

@Component({
  selector: "ngx-add-corporate",
  templateUrl: "./add-corporate.component.html",
  styleUrls: ["./add-corporate.component.scss"],
})
export class AddCorporateComponent implements OnInit {
  corporateForm!: FormGroup;
  levelsForm: FormGroup;
  existingUserGroupLevelsGlobal: number;
  userGroupNamesGlobal: string[] = [];
  private userIdToUpdate!: number;
  public isUpdateActive: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.corporateForm = this.formBuilder.group({
      fullname: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      address: ["", Validators.required],
      contactNo: ["", Validators.required],
      userGroupLevels: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.min(1),
          Validators.max(5),
        ])
      ),
      userGroupNames: this.formBuilder.array([]),
    });
    this.levelsForm = this.formBuilder.group({
      name: new FormControl("", [Validators.required]),
    });
    this.activatedRoute.params.subscribe((val) => {
      this.userIdToUpdate = val["id"];
      if (this.userIdToUpdate) {
        this.isUpdateActive = true;
        this.service
          .getCorporateByID(
            this.userIdToUpdate,
            "/v1/corporate/list_corporate_individual/?corporateID="
          )
          .subscribe({
            next: (res) => {
              console.log("res.data[0]=", res.data[0]);
              this.fillFormToUpdate(res.data[0]);
            },
            error: (err) => {
              console.log(err);
            },
          });
      }
    });
  }
  addCorporate() {
    this.userGroupNamesGlobal.push(...this.corporateForm.value.userGroupNames);
    console.log(this.corporateForm.value.userGroupLevels);
    this.levels.clear();
    const data = {
      ShortName: "",
      IndustryClassification: "",
      DateOfCommencementOfBusiness: "",
      PanNo: "",
      RiskCategory: "",
      Constitution: "",
      DateOfIncorporation: "",
      CbsCifId: "",
      FullName: this.corporateForm.value.fullname,
      corporateAddress: this.corporateForm.value.address,
      corporateEmail: this.corporateForm.value.email,
      corporateContact: this.corporateForm.value.contactNo,
      corporateUserGroupLevels: this.corporateForm.value.userGroupLevels,
      corporateUserGroupNames: this.userGroupNamesGlobal,
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
  fillFormToUpdate(corporate: Corporate) {
    this.existingUserGroupLevelsGlobal = corporate.corporateUserGroupLevels;
    this.corporateForm.patchValue({
      fullname: corporate.FullName,
      email: corporate.corporateEmail,
      address: corporate.corporateAddress,
      contactNo: corporate.corporateContact,
      userGroupLevels: corporate.corporateUserGroupLevels,
    });
    this.corporateForm.setControl(
      "userGroupNames",
      this.setExistingUserGroupNames(corporate.corporateUserGroupNames)
    );
  }
  setExistingUserGroupNames(
    corporateUserGroupNames: CorporateUserGroupName[]
  ): FormArray {
    const formArray = new FormArray([]);
    corporateUserGroupNames.forEach((obj) => {
      formArray.push(
        this.formBuilder.group({
          name: obj.name,
        })
      );
    });
    return formArray;
  }
  updateCorporate() {
    this.userGroupNamesGlobal.push(...this.corporateForm.value.userGroupNames);
    const userGroupLevelsControl = this.corporateForm.get('userGroupLevels');
    const data = {
      corporateID: this.userIdToUpdate,
      ShortName: "",
      IndustryClassification: "",
      DateOfCommencementOfBusiness: "",
      PanNo: "",
      RiskCategory: "",
      Constitution: "",
      DateOfIncorporation: "",
      CbsCifId: "",
      FullName: this.corporateForm.value.fullname,
      corporateAddress: this.corporateForm.value.address,
      corporateEmail: this.corporateForm.value.email,
      corporateContact: this.corporateForm.value.contactNo,
      corporateUserGroupLevels: userGroupLevelsControl.value,
      corporateUserGroupNames: this.userGroupNamesGlobal,
    };
    if (this.corporateForm.valid) {
      console.log("Data=", data);
      this.service
        .updateCorporate(data, "/v1/corporate/update_corporates")
        .subscribe({
          next: (response: IVerifyCreateCorporateResponse) => {
            console.log("Response:", response);
            if (response.code === "200") {
              this.toastr.success(
                "Corporate Updated Successfully",
                "Success 🐱‍🏍"
              );
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
  closeCorporate() {
    this.router.navigate(["/pages/corporates"]);
  }
  get levels() {
    return this.corporateForm.controls["userGroupNames"] as FormArray;
  }
  createLevelInputs() {
    const currentNumberOfLevels =
      this.corporateForm.get("userGroupLevels").value;
    console.log(
      "Currently Entered Levels currentNumberOfLevels=",
      currentNumberOfLevels
    );
    console.log(
      "Existing Levels this.existingUserGroupLevelsGlobal=",
      this.existingUserGroupLevelsGlobal
    );
    // this.corporateForm.get('userGroupLevels').disable();
    if (this.existingUserGroupLevelsGlobal !== undefined) {
      if (currentNumberOfLevels === 0) {
        this.toastr.warning("Please enter atleast one Level", "Warning");
        this.levels.clear();
        this.router.navigate(["/pages/corporates"]);
      } else if (currentNumberOfLevels < this.existingUserGroupLevelsGlobal) {
        const levelsToRemove =
          (this.existingUserGroupLevelsGlobal as number) -
          (currentNumberOfLevels as number);
        if (levelsToRemove > this.levels.length) {
          this.toastr.error(
            "Negative Values are strictly not Accepted",
            "Error ❌"
          );
          this.levels.clear();
          this.router.navigate(["/pages/corporates"]);
          return;
        }
        for (let i = 0; i < levelsToRemove; i++) {
          this.levels.removeAt(this.levels.length - 1);
        }
      } else {
        const levelsToAdd =
          currentNumberOfLevels - this.existingUserGroupLevelsGlobal;
        for (let i = 0; i < levelsToAdd; i++) {
          this.levels.push(
            this.formBuilder.group({
              name: new FormControl("", [Validators.required]),
            })
          );
        }
      }
    } else {
      if (currentNumberOfLevels > 0) {
        for (let i = 0; i < currentNumberOfLevels; i++) {
          this.levels.push(
            this.formBuilder.group({
              name: new FormControl("", [Validators.required]),
            })
          );
        }
      } else if (currentNumberOfLevels < 0) {
        this.toastr.error(
          "Negative Values are strictly not Accepted",
          "Error ❌"
        );
        this.levels.clear();
        this.router.navigate(["/pages/corporates"]);
      } else {
        this.toastr.warning("Please enter atleast one Level", "Warning");
        this.levels.clear();
        this.router.navigate(["/pages/corporates"]);
      }
    }
  }
}
