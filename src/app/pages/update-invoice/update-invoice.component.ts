import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import {
  IVerifyUpdateInvoiceResponse,
} from "../../interfaces/verifyResponse";
import { ListUniqueInvoiceDetailsByInvoiceIDData } from "../../interfaces/invoiceList";

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
      invoiceID: ["", Validators.required],
      // invoiceNO: ["", Validators.required],
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
      // invoiceNO:invoice.invoiceNO,
      invoiceID:invoice.invoiceID,
      invoiceAmount: invoice.invoiceAmount,
      invoiceDate: invoice.invoiceCreatedOn,
      financeAmount: invoice.financeAmount,
    });
  }
  async updateInvoice() {
    const data = {
      // invoiceNO: this.invoiceForm.value.invoiceNO,
      invoiceID: this.invoiceForm.value.invoiceID,
      invoiceAmount: this.invoiceForm.value.invoiceAmount,
      Invoice_Date: this.invoiceForm.value.invoiceDate,
      Finance_Amount: this.invoiceForm.value.financeAmount,
    };
      console.log("Data=", data);
      try {
        const response = (await this.service
          .updateInvoice(data, "/v1/invoice/update_document_invoice/")
          .toPromise()) as IVerifyUpdateInvoiceResponse;
        console.log("Response:", response);
        if (response.code === "200") {
          this.toastr.success(
            "Invoice Updated Successfully",
            "Success"
          );
          this.invoiceForm.reset();
          this.router.navigate([
            "/pages/orders"]);
        } else if (response.code === "500") {
          this.toastr.error(response.update_document_invoice, "Error");
        } else {
          this.toastr.error("Contact Admin for more Info", "Error");
        }
      } catch (error) {
        console.error("error:", error);
        this.toastr.error("Something went down", "Error");
      }
  
  }
  showReadOnlyMessage(){
    this.toastr.warning("This is a Read-Only Field", "Warning");
  }
  closeInvoice() {
    this.router.navigate(["/pages/orders"]);
  }
}
