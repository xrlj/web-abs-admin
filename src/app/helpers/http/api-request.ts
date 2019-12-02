// import {Injectable} from '@angular/core';
// import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
//
// import {Observable, throwError} from 'rxjs';
// import {catchError, retry} from 'rxjs/operators';
// import {environment} from '../../../environments/environment';
// import {HttpErrorHandler} from './http-error-handler';
// import {Constants} from '../constants';
//
// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Version': '0',
//     'Content-Type': 'application/json'
//   }),
//   params: new HttpParams(),
//   withCredentials: true // 跨域设置
// };
//
// @Injectable()
// export class ApiRequest {
//
//   private _url: string = environment.apiUrl;
//
//   private handler: Callback;
//
//   constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {
//   }
//
//   set url(url: string) {
//     this._url = url;
//   }
//
//   get url(): string {
//     return this._url;
//   }
//
//   callback(callback: Callback): ApiRequest {
//     this.handler = callback;
//     return this;
//   }
//
//   /**
//    * get请求。
//    * 泛型：P-请求参数对象；R-响应body对象。
//    * @param path url的path路径，如：auth/login
//    */
//   get(path: string): ApiRequest {
//     this.assertCallback();
//     this.handler.start();
//     this.http.get(this.url.concat(path), httpOptions)
//       .pipe(
//         retry(Constants.apiRequest.retryTime),
//         catchError(this.handleError)
//       ).subscribe(resp => {
//       console.log(resp);
//       // console.log(resp.data);
//       // const json = JSON.parse(JSON.stringify(resp));
//       // console.log('>>>>success:' + json.success);
//       // this.handler.ok(json);
//       // this.handler.finally();
//     }, error => {
//       this.handler.fail(error.status, error.msg);
//       this.handler.finally();
//     });
//     return this;
//   }
//
//   /**
//    * post通用请求。
//    * @param path 请求path。
//    * @param body 请求体。和params不同时存在。
//    * @param params 请求参数。
//    * @param contentType 请求内容类型，和params同时存在。
//    * @param version api版本号，默认0
//    */
//   post<R extends VBaseResp>(path: string, body?: any, version?: string, params?: HttpParams | {}, contentType?: string): void {
//     this.assertCallback();
//     this.handler.start();
//     if (version) {
//       httpOptions.headers = httpOptions.headers.set('Content-Version', version);
//     }
//     let client: Observable<R>;
//     if (!body && params && contentType) {
//       if (params instanceof HttpParams) {
//         httpOptions.params = params;
//       } else {
//         for (const key of Object.keys(params)) {
//           if (params.hasOwnProperty(key)) {
//             const v = params[key];
//             httpOptions.params = httpOptions.params.set(key, v);
//           }
//         }
//       }
//       httpOptions.headers = httpOptions.headers.set('Content-Type', contentType);
//
//       client = this.http.post<R>(environment.apiUrl.concat(path), httpOptions);
//     } else {
//       client = this.http.post<R>(environment.apiUrl.concat(path), body, httpOptions);
//     }
//
//     client.pipe(retry(Constants.apiRequest.retryTime), catchError(this.handleError))
//       .subscribe(resp => {
//         const success = resp.success;
//         const code = resp.code;
//         const msg = resp.msg;
//         if (success && code === 200) {
//           this.handler.ok(resp.data);
//         } else {
//           this.handler.fail(code, msg);
//         }
//         this.handler.finally();
//       }, error => {
//         this.handler.fail(error.status, error.msg);
//         this.handler.finally();
//       });
//   }
//
//   /**
//    * 判断要先初始化callback对象。否则抛出异常。
//    */
//   private assertCallback(): void {
//     if (this.handler === null || this.handler === undefined) {
//       throw new Error('before init callback object!');
//     }
//   }
//
//   /**
//    * 请求异常处理。
//    * @param error 错误信息体。
//    */
//   private handleError(error: HttpErrorResponse) {
//     console.error('请求异常： ' + error.message);
//     let errorInfo = {status: error.status, msg: '网络异常，稍后再试！'};
//     if (error.error instanceof ErrorEvent) {
//       console.error('发生请求错误，请检查您的本地网络哦！:', error.error.message);
//     } else { // 后台返回异常，状态码非200
//       if (error.error !== undefined && !error.error.success) {
//         console.error(`请求服务器异常： ${JSON.stringify(error.error)}`);
//         errorInfo = {status: error.error.code, msg: error.error.msg};
//       }
//     }
//
//     return throwError(errorInfo);
//   }
// }
