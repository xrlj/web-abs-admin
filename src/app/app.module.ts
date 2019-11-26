import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import {HttpErrorHandler} from './helpers/http/http-error-handler';
import {ApiRequest} from './helpers/http/api-request';
import {AppConfig} from './app.config';
import {CustomBtnComponent} from './components/custom-btn/custom-btn.component';

registerLocaleData(zh);

@NgModule({
  declarations: [AppComponent, CustomBtnComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }, AppConfig, HttpErrorHandler, ApiRequest],
  bootstrap: [AppComponent]
})
export class AppModule { }
