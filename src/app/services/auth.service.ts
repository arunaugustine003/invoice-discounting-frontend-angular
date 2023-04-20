import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}
  isEditClicked: boolean = false;
  email: string = "";
  baseURL = "http://localhost:8000";
  // baseURL = "http://54.254.242.153:8000";
  post(data: any, apiURL) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      accept: "application/json",
    });
    return this.http.post(this.baseURL + apiURL, data, { headers });
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
  getEmail() {
    return this.email;
  }
  IsLoggedIn() {
    return sessionStorage.getItem("usermail") != null;
  }
  getToken() {
    return sessionStorage.getItem("token") || "";
  }
  getCorporateData(apiURL: string) {
    const url = `${this.baseURL}${apiURL}`;
    return this.http.get(url);
  }
  getListCorporateUserGroup(corporateID: number, apiURL: string) {
    const requestBody = { corporateID: corporateID };
    const url = `${this.baseURL}${apiURL}`;
    return this.http.post<any>(url, requestBody);
  }
  getCorporateByID(corporateID: number, apiURL: string) {
    const requestBody = { corporateID: corporateID };
    const url = `${this.baseURL}${apiURL}`;
    return this.http.post<any>(url, requestBody);
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
  getUsers(id: number, apiURL: string) {
    const body = { corporateID: id };
    const url = `${this.baseURL}${apiURL}`;
    return this.http.post<any>(url, body);
  }
  getUserByID(id: number, apiURL: string) {
    const body = { userID: id };
    const url = `${this.baseURL}${apiURL}`;
    return this.http.post<any>(url, body);
  }
  getCorporateUserIDByName(id: number,username:string, apiURL: string) {
    const body = {
      corporateID: id,
      name: username
    };
    const url = `${this.baseURL}${apiURL}`;
    return this.http.post<any>(url, body);
  }
  
  getVendorData(apiURL: string) {
    const url = `${this.baseURL}${apiURL}`;
    return this.http.get(url);
  }
}
