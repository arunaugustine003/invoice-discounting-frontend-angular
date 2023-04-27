import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from "@angular/common/http";
import { Observable, Subject, throwError } from "rxjs";
import { catchError, takeUntil, tap } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private destroy$ = new Subject<void>();
  isEditClicked: boolean = false;

  email: string = "";
  /*** LOCAL BACKEND ***/
  baseURL = "http://localhost:8000";
  /*** PRODUCTION BACKEND ***/
  // baseURL = "http://54.254.242.153:8000";

  //API Methods

  // 1. Generic API Methods
  post(data: any, apiURL): Observable<any> {
    return this.http.post(`${this.baseURL}${apiURL}`, data);
  }
  get(apiURL: string) {
    const url = `${this.baseURL}${apiURL}`;
    return this.http.get(url);
  }
  // 2. Generic Get Methods
  getEmail() {
    return this.email;
  }
  // 3. Session Storage Methods
  IsLoggedIn() {
    return sessionStorage.getItem("usermail") != null;
  }
  getToken() {
    return sessionStorage.getItem("token") || "";
  }
  // 4. Custom API Methods
  getCurrentUser(apiURL: string): Observable<any> {
    const url = `${this.baseURL}${
      apiURL.startsWith("/") ? apiURL : `/${apiURL}`
    }`;
    return this.http.post<any>(url, {}).pipe(takeUntil(this.destroy$));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  logout(): Observable<HttpResponse<any>> {
    return this.http
      .delete(this.baseURL + "/v1/security/logout", { observe: "response" })
      .pipe(
        tap((response) => {
          if (response.status === 200) {
            localStorage.removeItem("token");
            console.log(response);
          }
        })
      );
  }
  getPaginatedList(skip: number, limit: number, apiURL: string) {
    const requestBody = { skip: skip, limit: limit };
    const url = `${this.baseURL}${apiURL}`;
    return this.http.post<any>(url, requestBody);
  }
  getCorporateByID(corporateID: number, apiURL: string) {
    const requestBody = { corporateID: corporateID };
    const url = `${this.baseURL}${apiURL}`;
    return this.http.post<any>(url, requestBody);
  }
  getAdminOrdersByID(orderID: number, corporateID: number, apiURL: string) {
    const requestBody = { orderID: orderID, corporateID: corporateID };
    const url = `${this.baseURL}${apiURL}`;
    return this.http.post<any>(url, requestBody);
  }
  getVendorLinked(
    skip: number,
    limit: number,
    vendorID: number,
    apiURL: string
  ) {
    const requestBody = { skip: skip, limit: limit, vendorID: vendorID };
    const url = `${this.baseURL}${apiURL}`;
    return this.http.post<any>(url, requestBody);
  }
  getCorporateLinked(
    skip: number,
    limit: number,
    corporateID: number,
    apiURL: string
  ) {
    const requestBody = { skip: skip, limit: limit, corporateID: corporateID };
    const url = `${this.baseURL}${apiURL}`;
    return this.http.post<any>(url, requestBody);
  }
  getUserByID(id: number, apiURL: string) {
    const body = { userID: id };
    const url = `${this.baseURL}${apiURL}`;
    return this.http.post<any>(url, body);
  }
  getCorporateUserIDByName(id: number, username: string, apiURL: string) {
    const body = {
      corporateID: id,
      name: username,
    };
    const url = `${this.baseURL}${apiURL}`;
    return this.http.post<any>(url, body);
  }
  getInvoicesByID(id: number, apiURL: string) {
    const body = { orderID: id };
    const url = `${this.baseURL}${apiURL}`;
    return this.http.post<any>(url, body);
  }
  getInvoiceDocument(id: number, apiURL: string) {
    const body = {
      invoiceID: id,
      ext: "csv",
    };
    const url = `${this.baseURL}${apiURL}`;
    return this.http.post<any>(url, body);
  }
  approveOrRejectInvoice(id: number, apiURL: string) {
    const body = {
      invoiceID: id,
    };
    const url = `${this.baseURL}${apiURL}`;
    return this.http.post<any>(url, body);
  }
  updateCorporate(corporate: any, apiURL: string) {
    return this.http.put<any>(`${this.baseURL}${apiURL}`, corporate);
  }
  deleteCorporate(id: number, apiURL: string) {
    const url = `${this.baseURL}${apiURL}`;
    const body = { corporateID: id };
    return this.http.put(url, body);
  }
  deleteCorporateUser(id: number, apiURL: string) {
    const url = `${this.baseURL}${apiURL}`;
    const body = { userID: id };
    return this.http.put(url, body);
  }
  createOrderorInvoice(
    ID: number,
    file: File,
    apiURL: string
  ): Observable<any> {
    var formData: any = new FormData();
    if (apiURL === "/v1/invoice/create_order/") {
      formData.append("vendorID", ID.toString());
    } else {
      formData.append("invoiceID", ID.toString());
    }
    formData.append("file", file);
    const url = `${this.baseURL}${apiURL}`;
    return this.http
      .post(url, formData, {
        reportProgress: true,
        observe: "events",
        responseType: "text",
      })
      .pipe(catchError(this.errorMgmt));
  }
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
