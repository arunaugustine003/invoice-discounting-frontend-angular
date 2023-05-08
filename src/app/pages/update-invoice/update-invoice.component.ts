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
import { ListAllInvoicesForUniqueOrderData, ListUniqueInvoiceDetailsByInvoiceIDData } from "../../interfaces/invoiceList";

@Component({
  selector: "ngx-update-invoice",
  templateUrl: "./update-invoice.component.html",
  styleUrls: ["./update-invoice.component.scss"],
})
export class UpdateInvoiceComponent implements OnInit {
  invoiceForm!: FormGroup;

  message: string;
  private invoiceIdToUpdate!: number;
  public isUpdateActive: boolean = false;
  invoiceGlobal:ListUniqueInvoiceDetailsByInvoiceIDData;
  corporateIDGlobal;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private service: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  async ngOnInit(): Promise<void> {
    this.invoiceForm = this.formBuilder.group({
      invoiceNO: ["", Validators.required],
      invoiceAmount: ["", Validators.required],
      invoiceDate: ["", Validators.required],
      financeAmount: ["", [Validators.required, Validators.email]],
    });
    await this.activatedRoute.params.subscribe(async (val) => {
      this.invoiceIdToUpdate = val["id"];
      console.log("this.invoiceIdToUpdate=", this.invoiceIdToUpdate);
      if (this.invoiceIdToUpdate) {
        const res = await this.service
          .getInvoiceByID(
            this.invoiceIdToUpdate,
            "/v1/invoice/view_invoice_by_invoiceID/?invoiceID="
          )
          .toPromise();
        this.invoiceGlobal = res.data;
        console.log("Invoice=",this.invoiceGlobal);
        this.fillFormToUpdate(this.invoiceGlobal);
      }
    });
  }

  fillFormToUpdate(invoice:ListUniqueInvoiceDetailsByInvoiceIDData) {
    this.invoiceForm.setValue({
      invoiceNO:invoice.invoiceNO,
      invoiceAmount: invoice.invoiceAmount,
      invoiceDate: invoice.invoiceCreatedOn,
      financeAmount: invoice.financeAmount,
    });
  }
  async updateInvoice() {
    const data = {
      invoiceNO: this.invoiceForm.value.invoiceNO,
      invoiceAmount: this.invoiceForm.value.invoiceAmount,
      invoiceDate: this.invoiceForm.value.invoiceDate,
      financeAmount: this.invoiceForm.value.financeAmount,
    };
    if (this.invoiceForm.valid) {
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
          this.invoiceForm.reset();
          console.log("this.corporateIDGlobal=", this.corporateIDGlobal);
          this.router.navigate([
            "/pages/corporate-users",
            this.corporateIDGlobal,
          ]);
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

  closeInvoice() {
    this.router.navigate(["/pages/orders"]);
  }
}
