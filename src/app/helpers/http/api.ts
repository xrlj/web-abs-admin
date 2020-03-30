import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Constants} from '../constants';
import {HandleError, HttpErrorHandler} from './http-error-handler';
import {environment} from '../../../environments/environment';
import {UIHelper} from '../ui-helper';
import { Router } from '@angular/router';
import {AppPath} from '../../app-path';
import {HttpUtils} from './HttpUtils';

const httpOptionsCommon = {
  headers: new HttpHeaders({
    'Content-Version': '0'
  }),
  params: new HttpParams(),
  withCredentials: true // 跨域设置
};

@Injectable({
  providedIn: 'root'
})
export class Api {

  private _url: string = environment.apiUrl;

  constructor(private http: HttpClient, private uiHelper: UIHelper, private router: Router, private httpErrorHandler: HttpErrorHandler, private httpUtils: HttpUtils) {
  }

  set url(url: string) {
    this._url = url;
  }

  get url(): string {
    return this._url;
  }

  /**
   * post通用请求。
   * @param path 请求path。
   * @param body 请求体。和params不同时存在。
   * @param version api版本号，默认0
   * @param params 请求参数。
   * @param contentType 请求内容类型，和params同时存在。参考枚举类:ContentTypeEnum
   */
  post(path: string, body?: any, version?: number, params?: HttpParams | {}, contentType?: string, headers?: HttpHeaders): any {
    if (path === null || path === undefined) {
      throw new Error('url缺少path');
    }
    const httpOptions = httpOptionsCommon;
    if (headers) {
      httpOptions.headers = headers;
    }
    if (version) {
      httpOptions.headers = httpOptions.headers.set('Content-Version', version.toString());
    }
    let client: Observable<any>;
    if (!body && (params && contentType)) {
      if (params instanceof HttpParams) {
        httpOptions.params = params;
      } else {
        for (const key of Object.keys(params)) {
          if (params.hasOwnProperty(key)) {
            const v = params[key];
            httpOptions.params = httpOptions.params.set(key, v);
          }
        }
      }
      httpOptions.headers = httpOptions.headers.set('Content-Type', contentType);

      client = this.http.post(environment.apiUrl.concat(path), null, httpOptions);
    } else {
      httpOptions.headers = httpOptions.headers.set('Content-Type', 'application/json');
      client = this.http.post(environment.apiUrl.concat(path), body, httpOptions);
    }

    // 定义处理器
    const handlers = {};
    client.pipe(retry(Constants.apiRequest.retryTime), catchError(this.handleError))
      .subscribe(resp => {
        const ok = handlers['ok'];
        const fail = handlers['fail'];
        const final = handlers['final'];
        const success = resp.success;
        const code = resp.code;
        const msg = resp.msg;
        if (code === 200 && success) {
          if (ok instanceof Function) {
            ok(resp.data);
          }
          if (final instanceof Function) {
            final(true);
          }
        } else {
          if (!this.httpUtils.dealError(code, msg)) {
            if (fail instanceof Function) {
              fail(resp);
            }
          }
          if (final instanceof Function) {
            final(false);
          }
        }
      }, error => {
        const fail = handlers['fail'];
        const final = handlers['final'];
        if (!this.httpUtils.dealError(error.code, error.msg)) {
          if (fail instanceof Function) {
            fail(error);
          }
        }
        if (final instanceof Function) {
          final(false);
        }
      });

    // 拟态返回器
    const result = {
      ok: fn => {
        handlers['ok'] = fn;
        return result;
      },
      fail: fn => {
        handlers['fail'] = fn;
        return result;
      },
      final: fn => {
        handlers['final'] = fn;
        return result;
      }
    };
    return result;
  }

  get(path: string, params?: HttpParams | {}, version?: number): any {
    if (!path) {
      throw new Error('url缺少path');
    }
    const url = environment.apiUrl.concat(path);
    const httpOptions = httpOptionsCommon;
    if (version) {
      httpOptions.headers = httpOptions.headers.set('Content-Version', version.toString());
    }
    let client: Observable<any>;
    if (params) {
      if (!(params instanceof HttpParams)) {
        for (const key of Object.keys(params)) {
          if (params.hasOwnProperty(key)) {
            const v = params[key];
            httpOptions.params = httpOptions.params.set(key, v);
          }
        }
      } else {
        httpOptions.params = params;
      }
    }
    client = this.http.get(url, httpOptions);
    const handlers = {};
    client = client.pipe(retry(Constants.apiRequest.retryTime), catchError(this.handleError));
    client.subscribe(resp => {
      const success = resp.success;
      const code = resp.code;
      const msg = resp.msg;
      const ok = handlers['ok'];
      const fail = handlers['fail'];
      const final = handlers['final'];
      if (success && code === 200) {
        if (ok instanceof Function) {
          ok(resp.data);
        }
        if (final instanceof Function) {
          final(true);
        }
      } else {
        if (!this.httpUtils.dealError(code, msg)) {
          if (fail instanceof Function) {
            fail(resp);
          }
        }
        if (final instanceof Function) {
          final(false);
        }
      }
    }, error => {
      const fail = handlers['fail'];
      const final = handlers['final'];
      if (!this.httpUtils.dealError(error.code, error.msg)) {
        if (fail instanceof Function) {
          fail(error);
        }
      }
      if (final instanceof Function) {
        final(false);
      }
    });

    // 拟态返回器
    const result = {
      ok: fn => {
        handlers['ok'] = fn;
        return result;
      },
      fail: fn => {
        handlers['fail'] = fn;
        return result;
      },
      final: fn => {
        handlers['final'] = fn;
        return result;
      }
    };
    return result;
  }

  delete(path: string, version?: number): any {
    if (!path) {
      throw new Error('url缺少path');
    }
    const httpOptions = httpOptionsCommon;
    if (version) {
      httpOptions.headers = httpOptions.headers.set('Content-Version', version.toString());
    }
    let client: Observable<any>;
    httpOptions.headers = httpOptions.headers.set('Content-Type', 'application/json');
    client = this.http.delete(environment.apiUrl.concat(path));

    // 定义处理器
    const handlers = {};
    client.pipe(retry(Constants.apiRequest.retryTime), catchError(this.handleError))
      .subscribe(resp => {
        const success = resp.success;
        const code = resp.code;
        const msg = resp.msg;
        const ok = handlers['ok'];
        const fail = handlers['fail'];
        const final = handlers['final'];
        if (code === 200 && success) {
          if (ok instanceof Function) {
            ok(resp.data);
          }
          if (final instanceof Function) {
            final(true);
          }
        } else {
          if (!this.httpUtils.dealError(code, msg)) {
            if (fail instanceof Function) {
              fail(resp);
            }
          }
          if (final instanceof Function) {
            final(false);
          }
        }
      }, error => {
        const fail = handlers['fail'];
        const final = handlers['final'];
        if (!this.httpUtils.dealError(error.code, error.msg)) {
          if (fail instanceof Function) {
            fail(error);
          }
        }
        if (final instanceof Function) {
          final(false);
        }
      });

    // 拟态返回器
    const result = {
      ok: fn => {
        handlers['ok'] = fn;
        return result;
      },
      fail: fn => {
        handlers['fail'] = fn;
        return result;
      },
      final: fn => {
        handlers['final'] = fn;
        return result;
      }
    };
    return result;
  }

  /**
   * 请求异常处理。
   * @param error 错误信息体。
   */
  private handleError(error: HttpErrorResponse) {
    console.error('请求异常： ' + error.message);
    let errorInfo = {code: error.status, msg: '网络异常，稍后再试！'};
    if (error.status === 0) {
      return throwError(errorInfo);
    }
    if (error.error instanceof ErrorEvent) {
      console.error('发生请求错误，请检查您的本地网络哦！:', error.error.message);
    } else { // 后台返回异常，状态码非200
      if (error.error !== undefined && !error.error.success) {
        console.error(`请求服务器异常： ${JSON.stringify(error.error)}`);
        errorInfo = {code: error.error.code, msg: error.error.msg};
      }
    }

    return throwError(errorInfo);
  }

  /**
   * 系统错误码统一处理。业务错误码在回调函数中处理。
   * @param errorCode 错误码
   * @param msg 错误信息。
   */
  /*public dealError(errorCode: number, msg: string): boolean {
    let isUnifiedError = false;
    if (errorCode === 401) { // 缺少api验证参数token
      isUnifiedError = true;
      this.uiHelper.msgTipWarning(msg);
    } else if (errorCode === 404) {
      isUnifiedError = true;
      this.uiHelper.msgTipError('请求不存在');
    } else if (errorCode === 410 || errorCode === 411 || errorCode === 412) { // 无效token或者已退出登录
      isUnifiedError = true;
      this.uiHelper.msgTipWarning(msg);
      localStorage.clear();
      this.router.navigateByUrl(AppPath.login);
    } else if (errorCode === 405) { // 对接口无访问权限
      isUnifiedError = true;
      this.uiHelper.msgTipWarning(msg);
    } else if (errorCode === 500) { // 系统内部未知异常
      isUnifiedError = true;
      this.uiHelper.msgTipError(msg);
    }
    return isUnifiedError;
  }*/
}
