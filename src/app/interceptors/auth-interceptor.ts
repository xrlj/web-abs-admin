import {Injectable} from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import {ApiPath} from '../api-path';
import {Router} from '@angular/router';
import {Constants} from '../helpers/constants';
import {Utils} from '../helpers/utils';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('>>>>>AuthInterceptor');
    const url: string = req.url;
    if (url.includes(ApiPath.login)) { // 登录
      return next.handle(req);
    } else { // 非登录请求，带上token
      const authToken = localStorage.getItem(Constants.localStorageKey.token);
      if (authToken === undefined || authToken === null) { // token失效
        this.router.navigateByUrl('/login');
      }
      const authReq = req.clone({ setHeaders: { Authorization: authToken, 'Content-Type':  'application/json' } });
      return next.handle(authReq);
    }
  }
}
