import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler,
  HttpRequest, HttpResponse,
  HttpEventType, HttpProgressEvent
} from '@angular/common/http';

import { Observable } from 'rxjs';
import {ApiPath} from '../api-path';
import {Constants} from '../helpers/constants';

@Injectable()
export class UploadInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('>>>>>UploadInterceptor');
    if (req.url.indexOf(ApiPath.sysfilesystem.sysFiles.uploadFile) === -1) {
      return next.handle(req);
    }

    // 处理上传文件接口额外信息
    const authToken = localStorage.getItem(Constants.localStorageKey.token);
    const newReq = req.clone({withCredentials: true, setHeaders: { Authorization: authToken } });
    return next.handle(newReq);
  }
}
