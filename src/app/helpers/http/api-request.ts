import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {Constants} from '../constants';

@Injectable()
export class ApiRequest {

  constructor( private http: HttpClient) { }

  private callback: Callback;

  handle(callback: Callback): ApiRequest {
    this.callback = callback;
    return this;
  }

  get<P, R>(url: string, o): void {
    this.assertCallback();

    this.http.get<R>(url)
      .pipe(retry(Constants.apiRequest.retryTime));
  }

  private assertCallback(): void {
    if (this.callback === null || this.callback === undefined) {
      throw Error;
    }
  }
}
