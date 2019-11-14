import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AffixComponent} from './affix/affix.component';
import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';

const routes: Routes = [
  { path: 'affix', component: AffixComponent },
  { path: 'breadcrumb', component: BreadcrumbComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavigationRoutingModule {}
