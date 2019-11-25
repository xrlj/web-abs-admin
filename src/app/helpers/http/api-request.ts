import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {Constants} from '../constants';
import {HandleError, HttpErrorHandler} from './http-error-handler';

@Injectable()
export class ApiRequest {

  constructor( private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {
  }

  private callback: Callback;

  handle(callback: Callback): ApiRequest {
    this.callback = callback;
    return this;
  }

  get<P, R>(url: string): void {
    this.assertCallback();

    this.http.get<R>(url)
      .pipe(
        retry(Constants.apiRequest.retryTime),
        catchError(this.handleError)
      );
  }

  private assertCallback(): void {
    if (this.callback === null || this.callback === undefined) {
      throw Error;
    }
  }

  /**
   * 请求一场处理。
   * @param error 错误信息体。
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
