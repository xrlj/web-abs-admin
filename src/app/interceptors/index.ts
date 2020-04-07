import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth-interceptor';
import {UploadInterceptor} from './upload-interceptor';
import {HeaderInterceptor} from './header-interceptor';
import {TrimNameInterceptor} from './trim-name-interceptor';

/*请求拦截器按照下往上顺序进入*/
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: UploadInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: TrimNameInterceptor, multi: true }
];
