import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {Constants} from '../constants';
import {HandleError, HttpErrorHandler} from './http-error-handler';
import {environment} from '../../../environments/environment';
import {ApiPath} from '../../api-path';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Version': '0'
  }),
  params: new HttpParams()
};

@Injectable()
export class ApiRequest {

  private _url: string = environment.apiUrl;

  private handler: Callback;

  constructor( private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {
  }

  set url(url: string) {
    this._url = url;
  }

  get url(): string {
    return this._url;
  }

  callback(callback: Callback): ApiRequest {
    this.handler = callback;
    return this;
  }

  /**
   * get请求。
   * 泛型：P-请求参数对象；R-响应body对象。
   * @param path url的path路径，如：auth/login
   */
  get(path: string): ApiRequest {
    this.assertCallback();
    this.handler.start();
    this.http.get(this.url.concat(path), httpOptions)
      .pipe(
        retry(Constants.apiRequest.retryTime),
        catchError(this.handleError)
      ).subscribe(resp => {
        console.log(resp);
        // console.log(resp.data);
        // const json = JSON.parse(JSON.stringify(resp));
        // console.log('>>>>success:' + json.success);
        // this.handler.ok(json);
        // this.handler.finally();
    }, error => {
        this.handler.fail(error.status, error.msg);
        this.handler.finally();
    });
    return this;
  }

  post<R extends VBaseResp>(path: string, body?: any, version?: string): Callback {
    debugger;
    this.assertCallback();
    this.handler.start();
    if (version) {
      httpOptions.headers.set('Content-Version', version);
    }
    if (path === '/oauth2/token') {
      const username: string = body.username;
      const password: string = body.password;
      httpOptions.headers = httpOptions.headers.append('Content-Type', 'application/x-www-form-urlencoded');
      // httpOptions.headers = httpOptions.headers.set('Authorization', 'Basic MVc2Rjd2eHlwd2JQdThFbFY2Y3NYNkplQm0wYTpDYkdmX1R5dlZfaUNVVXdudFAwaFF3MW5fOXNh');
      // httpOptions.headers = httpOptions.headers.set('Access-Control-Allow-Origin', environment.apiUrl);
      // const p = {grant_type: 'client_credentials'};
      httpOptions.params.append('grant_type', 'client_credentials');
    }
    this.http.post<R>('https://openapi.huawei.com:443/oauth2/token', httpOptions)
      .pipe(retry(Constants.apiRequest.retryTime), catchError(this.handleError))
      .subscribe(resp => {
        console.log(resp);
        this.handler.ok(resp);
        this.handler.finally();
      }, error => {
        this.handler.fail(error.status, error.msg);
        this.handler.finally();
      });
    return this.handler;
  }

  /**
   * 判断要先初始化callback对象。否则抛出异常。
   */
  private assertCallback(): void {
    if (this.handler === null || this.handler === undefined) {
      throw new Error('before init callback object!');
    }
  }

  /**
   * 请求异常处理。
   * @param error 错误信息体。
   */
  private handleError(error: HttpErrorResponse) {
    console.error('请求异常： ' + error.message);
    let  errorInfo = {status: error.status, msg: '网络异常，稍后再试！'};
    if (error.error instanceof ErrorEvent) {
      console.error('发生请求错误，请检查您的本地网络哦！:', error.error.message);
    } else { // 后台返回异常，状态码非200
      if (error.error !== undefined && error.error.success) {
        console.error(`请求服务器异常： ${JSON.stringify(error.error)}`);
        errorInfo = {status: error.status, msg: error.error.msg};
      }
    }

    return throwError(errorInfo);
  }
}
