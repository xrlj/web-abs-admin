import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {ApiPath} from '../api-path';
import {Router} from '@angular/router';
import {Constants} from '../helpers/constants';
import {Utils} from '../helpers/utils';
import {AppPath} from '../app-path';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private utils: Utils) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('>>>>>AuthInterceptor');
    const url: string = req.url;
    if (url.includes(ApiPath.login) || url.includes(ApiPath.logout)) { // 不需要登录携带token请求
      return next.handle(req);
    } else { // 非登录请求，带上token
      const authToken = localStorage.getItem(Constants.localStorageKey.token);
      if (authToken) { // 已登录
        // 服务端处理token是否过期，避免客户端和服务器时间不一致，或者改动客户端系统时间变成未过期
        /*const isExpired = this.utils.jwtTokenIsExpired();
        if (isExpired) { // token已经失效
          localStorage.clear();
          this.router.navigateByUrl(AppPath.login);
        }*/
      } else { // 未登录
        this.router.navigateByUrl(AppPath.login);
        return null;
      }

      // 普通请求
      const authReq = req.clone({ setHeaders: { Authorization: authToken} });
      return next.handle(authReq);
    }
  }
}
