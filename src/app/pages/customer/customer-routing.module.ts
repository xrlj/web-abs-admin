import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EtpManageComponent} from './etp-manage/etp-manage.component';
import {EtpAccountComponent} from './etp-account/etp-account.component';

const routes: Routes = [
  { path: 'etp', component: EtpManageComponent },
  { path: 'account', component: EtpAccountComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {}
