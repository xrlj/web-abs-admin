import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import {ApiPath} from '../api-path';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('>>>>>AuthInterceptor');
    console.log('>>>>>url:' + req.url);
    const url: string = req.url;
    if (!url.includes(ApiPath.login)) {
      const authReq = req.clone({ setHeaders: { 'Content-Type':  'application/json' } });
      return next.handle(authReq);
    } else {
      const authToken = localStorage.getItem('token');
      const authReq = req.clone({ setHeaders: { Authorization: authToken, 'Content-Type':  'application/json' } });
      return next.handle(authReq);
    }
  }
}
