import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpEvent, HttpEventType } from "@angular/common/http";

import { AuthService } from "../../../services/auth.service";
import { NbMenuService } from "@nebular/theme";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";
import { UploadBulkInvoiceResponse } from "../../../interfaces/invoiceList";
import { DownloadSampleDataResponse } from "../../../interfaces/orderList";

@Component({
  selector: "ngx-add-order",
  templateUrl: "./add-order.component.html",
  styleUrls: ["./add-order.component.scss"],
})
export class AddOrderComponent implements OnInit {
  files: any[] = [];
  notUploadedFiles: string[] = [];
  isDocumentAdded;
  IDToUpdate!: number;

  selectedFiles: FileList;
  selectedId: string;
  currentFileUpload: File;
  currentRoute: string;

  form: FormGroup;
  progress: number = 0;
  percentageGlobal: number = 0;
  orderIdGlobal: number = 0;
  orderCreationPage: boolean = false;
  displayProgressBar: boolean = false;
  constructor(
    private service: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((val) => {
      this.IDToUpdate = val["id"];
      console.log("this.IDToUpdate=", this.IDToUpdate);
    });
    this.currentRoute = this.router.url;
    console.log("Current route=", this.currentRoute);
    if (this.currentRoute.toLowerCase().includes("add-order")) {
      this.orderCreationPage = true;
    } else {
      this.orderCreationPage = false;
    }
  }

  //Change Load Function
  onChangeLoad(event, tp = 0) {
    this.isDocumentAdded = true;
    let input = tp == 0 ? event.srcElement : event;
    let self = this;
    var extension =
      tp == 0
        ? input.value.split(".").pop().toLowerCase()
        : input[0].name.split(".").pop().toLowerCase();
    if (extension !== "csv") {
      this.toastr.error(
        "Not a Valid CSV file. Please upload another one",
        "Error"
      );
      return;
    } else {
      var fileReader = new FileReader();
      fileReader.onload = function (e: any) {
        self.toastr.success(
          "File Loaded to Application Successfully",
          "Success"
        );
      };
      if (tp == 0) {
        fileReader.readAsDataURL(input.files[0]);
      } else {
        fileReader.readAsDataURL(input[0]);
      }
      var file = tp == 0 ? event.target.files : event;
      this.prepareFilesList(file);
    }
  }
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
      console.log("File=", this.files[0]);
    }
  }
  deleteFile() {
    Swal.fire({
      title: "Are you sure want to Delete?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        //your logic if Yes clicked
        this.files = [];
        this.notUploadedFiles = [];
        this.isDocumentAdded = false;
      } else {
        console.log("You Clicked No");
        this.router.navigateByUrl(this.currentRoute);
      }
    });
  }
  uploadFile() {
    console.log("this.isDocumentAdded=", this.isDocumentAdded);
    if (this.isDocumentAdded == false) {
      return;
    }
    console.log("File Present !!,Green Flag to Upload");
    this.displayProgressBar = true;
    if (this.currentRoute.toLowerCase().includes("add-order")) {
      this.createOrder(
        this.IDToUpdate,
        this.files[0],
        "/v1/invoice/create_order/"
      );
    } else if (this.currentRoute.toLowerCase().includes("add-invoice")) {
      this.createInvoice(
        this.IDToUpdate.toString(),
        this.files,
        "/v1/invoice/upload_document_invoice/"
      );
    } else {
      return;
    }
  }
  createInvoice(id: string, files: File[], apiURL: string) {
    this.service.uploadDocumentInvoice(id, files, apiURL).subscribe(
      (response: UploadBulkInvoiceResponse) => {
        if (response.code === "200") {
          console.log("Upload success:", response);
          if (response.notUploded.length > 0) {
            this.toastr.warning(
              "Please upload files with filename matching the invoice name",
              "Warning"
            );
            this.notUploadedFiles = response.notUploded;
          } else {
            this.toastr.success("Files uploaded Successfully", "Success");
            this.files = [];
            this.router.navigate(["/pages/invoices-l1", this.IDToUpdate]);
          }
        } else {
          this.toastr.error(
            "Uploading files Failed. Please try again",
            "Error"
          );
        }
      },
      (error) => {
        console.error("Upload error:", error);
        this.toastr.error("Uploading files Failed. Please try again", "Error");
      }
    );
  }

  createOrder(id: number, file: File, apiURL: string) {
    this.service
      .createOrder(id, file, apiURL)
      .subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log("Request has been made!");
            break;
          case HttpEventType.ResponseHeader:
            console.log("Response header has been received!");
            break;
          case HttpEventType.UploadProgress:
            this.progress = Math.round((event.loaded / event.total) * 100);
            console.log(`Uploaded! ${this.progress}%`);
            break;
          case HttpEventType.Response:
            this.orderCreationPage === true
              ? this.toastr.success("Order Created Successfully", "Success")
              : this.toastr.success("Invoice Uploaded Successfully", "Success");
            console.log(event.body);
            const responseArray = event.body
              .split("\n")
              .map((str) => {
                if (!str.trim()) return null; // skip empty lines
                const dataString = str.substring(
                  str.indexOf("{"),
                  str.lastIndexOf("}") + 1
                );
                return JSON.parse(dataString);
              })
              .filter((obj) => obj !== null);
            console.log("responseArray=", responseArray);
            responseArray.forEach((obj) => {
              if (obj.msg === "progress") {
                this.percentageGlobal = obj.percentage;
                console.log(`Percentage: ${this.percentageGlobal}`);
              } else if (obj.msg === "success") {
                this.percentageGlobal = 100;
                this.orderIdGlobal = obj.order_id;
                console.log(`Order ID: ${this.orderIdGlobal}`);
                this.orderCreationPage === true
                  ? this.toastr.success(
                      "Newly created Order ID will be " + this.orderIdGlobal,
                      "Success"
                    )
                  : this.toastr.success(
                      "Invoice moved to next User Level Stage",
                      "Success"
                    );
              }
            });

            setTimeout(() => {
              if (this.orderCreationPage) {
                this.toastr.success(
                  "Click on Orders to View the newly created Order",
                  "Success"
                );
              }
              this.router.navigate(["/pages/orders"]);
            }, 1500);
        }
      });
  }
  downloadSampleDocument() {
    this.service
      .getDocumentSample("/v1/invoice/view_document_sample/")
      .subscribe({
        next: (response: DownloadSampleDataResponse) => {
          console.log("Response:", response);
          if (response.code === "200") {
            window.open(response.data);
            this.toastr.success("Document Downloaded Successfully", "Success");
          } else if (response.code === "500") {
            this.toastr.error(response.view_document_sample, "Error");
          } else {
            this.toastr.error("Document Download Failed", "Error");
          }
        },
        error: (error) => {
          console.error("error:", error);
          this.toastr.error("Something went down", "Error");
        },
      });
  }
}
