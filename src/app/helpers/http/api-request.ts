import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {Constants} from '../constants';
import {HandleError, HttpErrorHandler} from './http-error-handler';
import {environment} from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'Basic '
  })
};

@Injectable()
export class ApiRequest {

  private _url: string = environment.apiUrl;

  private callback: Callback;

  constructor( private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {
  }

  set url(url: string) {
    this._url = url;
  }

  get url(): string {
    return this._url;
  }

  handle(callback: Callback): ApiRequest {
    this.callback = callback;
    return this;
  }

  /**
   * get请求。
   * 泛型：P-请求参数对象；R-响应body对象。
   * @param path url的path路径，如：auth/login
   */
  get<P, R>(path: string): void {
    this.assertCallback();
    this.callback.start();
    this.http.get<R>(this.url.concat(path))
      .pipe(
        retry(Constants.apiRequest.retryTime),
        catchError(this.handleError)
      ).subscribe(json => {
        this.callback.finally();
    }, error => {
        this.callback.fail(error.status, error.msg);
        this.callback.finally();
    });
  }

  post<P, R>(path: string, parVo: P): void {
    this.assertCallback();
    this.callback.start();
    this.http.post<R>(this.url.concat(path), parVo, httpOptions)
      .pipe(retry(Constants.apiRequest.retryTime), catchError(this.handleError))
      .subscribe(json => {
        console.log('>>>>success json:' + json);
        this.callback.ok(json);
        this.callback.finally();
      }, error => {
        this.callback.fail(error.status, error.msg);
        this.callback.finally();
      });
  }

  /**
   * 判断要先初始化callback对象。否则抛出异常。
   */
  private assertCallback(): void {
    if (this.callback === null || this.callback === undefined) {
      throw new Error('before init callback object!');
    }
  }

  /**
   * 请求异常处理。
   * @param error 错误信息体。
   */
  private handleError(error: HttpErrorResponse) {
    debugger;
    let  errorInfo = {status: 0, msg: '网络异常，稍后再试！'};
    if (error.error instanceof ErrorEvent) {
      console.error('发生请求错误，请检查您的本地网络哦！:', error.error.message);
    } else { // 后台返回异常，状态码非200
      console.error(`请求异常： ${JSON.stringify(error.error)}`);
      errorInfo = {status: error.status, msg: error.error.msg};
    }

    return throwError(errorInfo);
  }
}
