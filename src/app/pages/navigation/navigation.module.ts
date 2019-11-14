import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';

import {NavigationRoutingModule} from './navigation-routing.module';
import {AffixComponent} from './affix/affix.component';
import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    AffixComponent,
    BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    NavigationRoutingModule
  ]
})
export class NavigationModule {}
