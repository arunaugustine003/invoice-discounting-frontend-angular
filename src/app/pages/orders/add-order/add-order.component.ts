import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpEvent, HttpEventType } from "@angular/common/http";

import { AuthService } from "../../../services/auth.service";
import { NbMenuService } from "@nebular/theme";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";

@Component({
  selector: "ngx-add-order",
  templateUrl: "./add-order.component.html",
  styleUrls: ["./add-order.component.scss"],
})
export class AddOrderComponent implements OnInit {
  files: any[] = [];
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

  constructor(
    public fb: FormBuilder,
    private service: AuthService,
    private menuService: NbMenuService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      vendorID: [""],
      file: [null],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((val) => {
      this.IDToUpdate = val["id"];
      console.log("this.IDToUpdate=", this.IDToUpdate);
    });
    this.currentRoute = this.router.url;
    console.log("Current route=", this.currentRoute);
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
        "Error ❌"
      );
      return;
    } else {
      var fileReader = new FileReader();
      fileReader.onload = function (e: any) {
        self.toastr.success(
          "File Loaded to Application Successfully",
          "Success 🐱‍🏍"
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
    this.onOrderSubmit(this.IDToUpdate, this.files[0]);
  }
  uploadFile1(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      file: file,
    });
    this.form.get("file").updateValueAndValidity();
  }
  submitUser() {
    this.service
      .addUser(this.form.value.vendorID, this.form.value.file)
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
            console.log("Order successfully created!");
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
                this.percentageGlobal=100;
                this.orderIdGlobal = obj.order_id;
                console.log(`Order ID: ${this.orderIdGlobal}`);
              }
            });

          // setTimeout(() => {
          //   this.progress = 0;
          // }, 1500);
        }
      });
  }
  onOrderSubmit(ID: number, file: File) {
    console.log(this.currentRoute.toLowerCase().includes("add-order"));
    if (this.currentRoute.toLowerCase().includes("add-order")) {
      console.log("Vendor ID before FormData=", ID);
      console.log("File before FormData=", file);
      const formData = new FormData();
      formData.append("vendorID", ID.toString());
      formData.append("file", file);
      console.log("Vendor ID after FormData=", ID);
      console.log("File after FormData=", file);

      // formData.forEach((value, key) => {
      //   console.log(key + " " + value);
      // });
      this.service.createOrder(formData, "/v1/invoice/create_order/").subscribe(
        (response) => {
          console.log("Response:", response);
        },
        (error) => {
          console.error("Error:", error);
        }
      );
    } else if (this.currentRoute.toLowerCase().includes("add-invoice")) {
      console.log("Invoice ID before FormData=", this.IDToUpdate);
      console.log("File before FormData=", file);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("ID", ID.toString());
      formData.forEach((value, key) => {
        console.log(key + " " + value);
      });
      this.service
        .createOrder(FormData, "/v1/invoice/upload_document_invoice/")
        .subscribe(
          (response) => {
            console.log("Response:", response);
          },
          (error) => {
            console.error("Error:", error);
          }
        );
    } else {
      return;
    }
  }
}
