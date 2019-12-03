import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxEchartsModule} from 'ngx-echarts';

import {NgZorroAntdModule} from 'ng-zorro-antd';
import {PagesRoutingModule} from './pages-routing.module';
import {ThemeModule} from '../theme/theme.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './login/login.component';
import { InitComponent } from './init/init.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [DashboardComponent, LoginComponent, InitComponent, NotFoundComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    ThemeModule,
    NgxEchartsModule
  ]
})
export class PagesModule {}
