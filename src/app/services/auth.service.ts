import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

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
}
