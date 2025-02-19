import { HttpInterceptor,HttpHandler, HttpRequest, HttpEvent } from "@angular/common/http";
import { Injectable, Injector } from '@angular/core';
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private inject:Injector) { }
  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
    console.log("Interceptor Invoked");
    let authservice=this.inject.get(AuthService);
    let jwtToken=req.clone({
      setHeaders:{
        Authorization:'bearer '+authservice.getToken(),
        "Content-Type": "application/json",
        accept: "application/json",
      }
    });
    return next.handle(jwtToken);
  }
}
