import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {CustomBtnComponent} from './components/custom-btn/custom-btn.component';
import {httpInterceptorProviders} from './interceptors';
import { UEditorModule } from 'ngx-ueditor';

registerLocaleData(zh);

@NgModule({
  declarations: [AppComponent, CustomBtnComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    UEditorModule.forRoot({
      js: [
        `./assets/ueditor/ueditor.config.js`,
        `./assets/ueditor/ueditor.all.min.js`,
      ],
      // 默认前端配置项
      options: {
        UEDITOR_HOME_URL: './assets/ueditor/'
      }
    })
  ],
  providers: [{provide: NZ_I18N, useValue: zh_CN}, httpInterceptorProviders],
  exports: [
    CustomBtnComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
