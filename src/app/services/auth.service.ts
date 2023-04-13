import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { CorporateUpdationData } from "../interfaces/corporateList";
import { IVerifyGetCorporateByIDResponse } from "../interfaces/verifyResponse";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private http: HttpClient
  ) {}
  email: string = "";
  baseURL = "http://localhost:8000";
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
  IsLoggedIn(){
    return sessionStorage.getItem('usermail')!=null;
  }
  getCorporateData(apiURL: string) {
    const url = `${this.baseURL}${apiURL}`;
    return this.http.get(url);
  }
  getCorporateByID(corporateID: number,apiURL: string): Observable<any> {
    const url = `${this.baseURL}${apiURL}${corporateID}`;
    return this.http.get<any>(url).pipe(
      catchError((error) => {
        console.error(`Error getting corporate with ID ${corporateID}: `, error);
        throw error;
      })
    );
  }
  // getRegisteredUserId(id: number) {
  //   return this.http.get<any>(`${this.baseUrl}/${id}`)
  // }
  getProduct(){
    return this.http.get<any>("http://localhost:3000/corporateList/");
  }
  postProduct(data:any){
    return this.http.post<any>("http://localhost:3000/corporateList/",data);
  }
  updateCorporate(corporate: any,apiURL: string,id: number) {
    return this.http.put<any>(`${this.baseURL}${apiURL}/${id}`, corporate);
  }
  deleteRegistered(id: number,apiURL: string) {
    // return this.http.delete<User>(`${this.baseUrl}/${id}`)
    // return this.http.put<any>(`${this.baseURL}${apiURL}`, id);
    // const url = `${this.baseURL}${apiURL}`;
    // const body = {
    //   corporateID: id
    // };
    // return this.http.put(url, body);
    // return this.http.put<any>(`${this.baseURL}${apiURL}`, id);

    const url = `${this.baseURL}${apiURL}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    const body = {
      "corporateID": id
    };
    return this.http.put(url, body, { headers });
  
  }
  // updateRegisterUser(registerObj: User, id: number) {
  //   return this.http.put<User>(`${this.baseUrl}/${id}`, registerObj)
  // }
}
